/*---------------------------------------------------------------------------------------------
 *  Copyright (c) AlgoCoach. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Contest Dock Spike - State Service
 *
 * Spike-level state service for Contest Dock.
 * Coordinates state between Companion and Site Adapter integrations.
 */

import { createDecorator } from 'vs/platform/instantiation/common/instantiation';
import { Emitter, Event } from 'vs/base/common/event';
import { Disposable } from 'vs/base/common/lifecycle';

/**
 * Service declaration
 */
export const IContestDockStateService = createDecorator<IContestDockStateService>('contestDockStateService');

/**
 * Contest status type (spike: mirror of packages/contest-dock types)
 */
export type ContestStatus = 'idle' | 'connecting' | 'in-contest' | 'finished';

/**
 * Site info interface
 */
export interface SiteInfo {
	siteId: string;
	siteName: string;
	url?: string;
}

/**
 * Problem info interface
 */
export interface ProblemInfo {
	problemId: string;
	problemName?: string;
	contestId?: string;
}

/**
 * Contest state interface
 */
export interface ContestState {
	status: ContestStatus;
	site?: SiteInfo;
	problem?: ProblemInfo;
	lastUpdated: number;
}

/**
 * Companion handshake status
 */
export interface CompanionHandshakeStatus {
	connected: boolean;
	extensionVersion?: string;
	hostVersion?: string;
}

/**
 * Site recognition result
 */
export interface SiteRecognitionResult {
	recognized: boolean;
	siteId?: string;
	siteName?: string;
	pageType?: 'contest' | 'problem' | 'submission' | 'unknown';
	contestId?: string;
	problemId?: string;
}

/**
 * Contest Dock State Service interface
 */
export interface IContestDockStateService {
	readonly _serviceBrand: undefined;

	readonly onStateChange: Event<ContestState>;

	/**
	 * Get current state
	 */
	getState(): ContestState;

	/**
	 * Handle companion handshake
	 */
	onCompanionHandshake(status: CompanionHandshakeStatus): void;

	/**
	 * Handle site recognition
	 */
	onSiteRecognized(result: SiteRecognitionResult): void;

	/**
	 * Reset state
	 */
	reset(): void;
}

/**
 * Contest Dock State Service implementation
 */
export class ContestDockStateService extends Disposable implements IContestDockStateService {
	declare readonly _serviceBrand: undefined;

	private readonly _onStateChange = new Emitter<ContestState>();
	readonly onStateChange: Event<ContestState> = this._onStateChange.event;

	private currentState: ContestState;
	private companionStatus: CompanionHandshakeStatus = { connected: false };

	constructor() {
		super();
		this.currentState = {
			status: 'idle',
			lastUpdated: Date.now()
		};
		this._register(this._onStateChange);
	}

	getState(): ContestState {
		return { ...this.currentState };
	}

	onCompanionHandshake(status: CompanionHandshakeStatus): void {
		this.companionStatus = status;
		console.log('[ContestDockStateService] Companion handshake:', status);

		if (status.connected) {
			this.updateState({ status: 'connecting' });
		} else {
			this.updateState({ status: 'idle' });
		}
	}

	onSiteRecognized(result: SiteRecognitionResult): void {
		console.log('[ContestDockStateService] Site recognized:', result);

		if (result.recognized && result.siteId) {
			const site: SiteInfo = {
				siteId: result.siteId,
				siteName: result.siteName || result.siteId
			};

			const updates: Partial<ContestState> = { site };

			if (result.pageType === 'contest' && result.contestId) {
				updates.status = 'in-contest';
			}

			if (result.problemId) {
				const problem: ProblemInfo = {
					problemId: result.problemId,
					contestId: result.contestId
				};
				updates.problem = problem;
			}

			this.updateState(updates);
		}
	}

	reset(): void {
		this.currentState = {
			status: 'idle',
			lastUpdated: Date.now()
		};
		this.companionStatus = { connected: false };
		this._onStateChange.fire(this.getState());
		console.log('[ContestDockStateService] State reset');
	}

	private updateState(updates: Partial<ContestState>): void {
		this.currentState = {
			...this.currentState,
			...updates,
			lastUpdated: Date.now()
		};
		this._onStateChange.fire(this.getState());
	}
}
