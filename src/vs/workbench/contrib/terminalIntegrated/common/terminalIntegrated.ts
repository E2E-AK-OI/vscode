/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { createDecorator } from '../../../../platform/instantiation/common/instantiation.js';
import { Event, Emitter } from '../../../../base/common/event.js';

/**
 * Workbench mode service interface identifier
 */
export const IWorkbenchModeService = createDecorator<IWorkbenchModeService>('workbenchModeService');

/**
 * Workbench mode service interface
 * spike: minimal interface definition and state management
 */
export interface IWorkbenchModeService {
	readonly _serviceBrand: undefined;

	/**
	 * Current active mode
	 */
	readonly currentMode: string;

	/**
	 * Switch to target mode
	 * @param mode target mode identifier
	 */
	switchMode(mode: string): void;

	/**
	 * Mode change event
	 */
	onModeChange: Event<string>;
}

/**
 * Workbench mode service implementation
 * spike: simplified implementation, only supports mode state management and event notification
 */
export class WorkbenchModeService implements IWorkbenchModeService {
	readonly _serviceBrand: undefined;

	private _currentMode = 'dashboard';
	private readonly _onModeChange = new Emitter<string>();
	public readonly onModeChange = this._onModeChange.event;

	get currentMode(): string {
		return this._currentMode;
	}

	switchMode(mode: string): void {
		if (this._currentMode !== mode) {
			this._currentMode = mode;
			this._onModeChange.fire(mode);
		}
	}
}
