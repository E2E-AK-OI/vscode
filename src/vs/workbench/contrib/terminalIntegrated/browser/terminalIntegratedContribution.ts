/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Disposable } from '../../../../base/common/lifecycle.js';
import { Registry } from '../../../../platform/registry/common/platform.js';
import { ViewContainerLocation, IViewContainersRegistry, Extensions as ViewContainerExtensions } from '../../../common/views.js';
import { localize, localize2 } from '../../../../nls.js';
import { Codicon } from '../../../../base/common/codicons.js';
import { registerIcon } from '../../../../platform/theme/common/iconRegistry.js';
import { KeyMod, KeyCode } from '../../../../base/common/keyCodes.js';

// Register icons for each view
const dashboardViewIcon = registerIcon('dashboard-view-icon', Codicon.dashboard, localize('dashboardViewIcon', 'View icon of the dashboard view.'));
const teachingViewIcon = registerIcon('teaching-view-icon', Codicon.mortarBoard, localize('teachingViewIcon', 'View icon of the teaching view.'));
const exampleViewIcon = registerIcon('example-view-icon', Codicon.fileCode, localize('exampleViewIcon', 'View icon of the example view.'));
const homeworkViewIcon = registerIcon('homework-view-icon', Codicon.checklist, localize('homeworkViewIcon', 'View icon of the homework view.'));

/**
 * Terminal integrated contribution
 * spike: register four view container placeholders
 */
export class TerminalIntegratedContribution extends Disposable {
	static readonly ID = 'workbench.contrib.terminalIntegrated';

	constructor() {
		super();

		this.registerViewContainers();
	}

	private registerViewContainers(): void {
		const viewContainersRegistry = Registry.as<IViewContainersRegistry>(ViewContainerExtensions.ViewContainersRegistry);

		// spike: register view containers with icons for ActivityBar display
		// full view pane implementations will be completed in subsequent tasks

		const viewContainerConfigs = [
			{ id: 'terminal.dashboard', title: localize2('dashboard', 'Dashboard'), icon: dashboardViewIcon, order: 10, keybinding: KeyMod.CtrlCmd | KeyMod.Shift | KeyCode.KeyD },
			{ id: 'terminal.teaching', title: localize2('teaching', 'Teaching'), icon: teachingViewIcon, order: 11, keybinding: KeyMod.CtrlCmd | KeyMod.Shift | KeyCode.KeyT },
			{ id: 'terminal.example', title: localize2('example', 'Example'), icon: exampleViewIcon, order: 12, keybinding: KeyMod.CtrlCmd | KeyMod.Shift | KeyCode.KeyX },
			{ id: 'terminal.homework', title: localize2('homework', 'Homework'), icon: homeworkViewIcon, order: 13, keybinding: KeyMod.CtrlCmd | KeyMod.Shift | KeyCode.KeyH },
		];

		for (const config of viewContainerConfigs) {
			viewContainersRegistry.registerViewContainer(
				{
					id: config.id,
					ctorDescriptor: undefined!, // spike: placeholder, no ctor provided
					title: config.title,
					storageId: `${config.id}.state`,
					icon: config.icon,
					hideIfEmpty: true,
					order: config.order,
					openCommandActionDescriptor: {
						id: config.id,
						title: config.title,
						keybindings: { primary: config.keybinding },
						order: config.order
					},
				},
				ViewContainerLocation.Sidebar
			);
		}
	}
}
