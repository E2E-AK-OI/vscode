/*---------------------------------------------------------------------------------------------
 *  Copyright (c) AlgoCoach. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Contest Dock Spike - View
 *
 * Spike-level implementation of Contest Dock view.
 * Provides minimal dock shell and status placeholders.
 */

import { IViewPaneOptions, ViewPane } from 'vs/workbench/browser/parts/views/viewPane';
import { IKeybindingService } from 'vs/platform/keybinding/common/keybinding';
import { IContextMenuService } from 'vs/platform/contextview/browser/contextView';
import { IConfigurationService } from 'vs/platform/configuration/common/configuration';
import { IContextKeyService } from 'vs/platform/contextkey/common/contextkey';
import { IViewDescriptorService } from 'vs/workbench/common/views';
import { IInstantiationService } from 'vs/platform/instantiation/common/instantiation';
import { IOpenerService } from 'vs/platform/opener/common/opener';
import { IThemeService } from 'vs/platform/theme/common/themeService';
import { ITelemetryService } from 'vs/platform/telemetry/common/telemetry';
import { Event, Emitter } from 'vs/base/common/event';

/**
 * Contest Dock status type (spike: mirror of packages/contest-dock types)
 */
export type ContestStatus = 'idle' | 'connecting' | 'in-contest' | 'finished';

/**
 * Contest Dock view
 *
 * Spike: Minimal dock shell with status placeholders.
 */
export class ContestDockView extends ViewPane {
	private statusElement: HTMLElement | undefined;
	private siteElement: HTMLElement | undefined;
	private problemElement: HTMLElement | undefined;
	private connectionElement: HTMLElement | undefined;

	private readonly _onStatusChange = new Emitter<ContestStatus>();
	readonly onStatusChange: Event<ContestStatus> = this._onStatusChange.event;

	private currentStatus: ContestStatus = 'idle';

	constructor(
		options: IViewPaneOptions,
		@IKeybindingService keybindingService: IKeybindingService,
		@IContextMenuService contextMenuService: IContextMenuService,
		@IConfigurationService configurationService: IConfigurationService,
		@IContextKeyService contextKeyService: IContextKeyService,
		@IViewDescriptorService viewDescriptorService: IViewDescriptorService,
		@IInstantiationService instantiationService: IInstantiationService,
		@IOpenerService openerService: IOpenerService,
		@IThemeService themeService: IThemeService,
		@ITelemetryService telemetryService: ITelemetryService
	) {
		super(options, keybindingService, contextMenuService, configurationService, contextKeyService, viewDescriptorService, instantiationService, openerService, themeService, telemetryService);
	}

	protected override renderBody(container: HTMLElement): void {
		super.renderBody(container);

		// Spike: Create minimal status placeholders
		container.classList.add('contest-dock-container');

		// Status display
		this.statusElement = document.createElement('div');
		this.statusElement.className = 'contest-dock-status';
		this.statusElement.textContent = 'Status: Idle (spike)';
		container.appendChild(this.statusElement);

		// Site info placeholder
		this.siteElement = document.createElement('div');
		this.siteElement.className = 'contest-dock-site';
		this.siteElement.textContent = 'Site: Not connected (spike)';
		container.appendChild(this.siteElement);

		// Problem info placeholder
		this.problemElement = document.createElement('div');
		this.problemElement.className = 'contest-dock-problem';
		this.problemElement.textContent = 'Problem: None (spike)';
		container.appendChild(this.problemElement);

		// Connection status placeholder
		this.connectionElement = document.createElement('div');
		this.connectionElement.className = 'contest-dock-connection';
		this.connectionElement.textContent = 'Companion: Not connected (spike)';
		container.appendChild(this.connectionElement);

		console.log('[ContestDockView] Rendered spike shell');
	}

	/**
	 * Update contest status
	 */
	updateStatus(status: ContestStatus): void {
		this.currentStatus = status;
		if (this.statusElement) {
			this.statusElement.textContent = `Status: ${status} (spike)`;
		}
		this._onStatusChange.fire(status);
		console.log('[ContestDockView] Status updated:', status);
	}

	/**
	 * Update site information
	 */
	updateSite(siteName: string, url?: string): void {
		if (this.siteElement) {
			this.siteElement.textContent = `Site: ${siteName} (spike)`;
		}
		console.log('[ContestDockView] Site updated:', siteName);
	}

	/**
	 * Update problem information
	 */
	updateProblem(problemId: string, problemName?: string): void {
		if (this.problemElement) {
			const display = problemName ? `${problemId} - ${problemName}` : problemId;
			this.problemElement.textContent = `Problem: ${display} (spike)`;
		}
		console.log('[ContestDockView] Problem updated:', problemId);
	}

	/**
	 * Update companion connection status
	 */
	updateConnection(connected: boolean, version?: string): void {
		if (this.connectionElement) {
			const status = connected ? `Connected (v${version || 'unknown'})` : 'Not connected';
			this.connectionElement.textContent = `Companion: ${status} (spike)`;
		}
		console.log('[ContestDockView] Connection updated:', connected);
	}

	/**
	 * Get current status
	 */
	getStatus(): ContestStatus {
		return this.currentStatus;
	}

	override dispose(): void {
		this._onStatusChange.dispose();
		super.dispose();
	}
}
