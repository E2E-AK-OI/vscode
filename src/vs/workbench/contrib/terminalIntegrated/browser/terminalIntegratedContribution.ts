/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Disposable } from '../../../../base/common/lifecycle.js';
import { Registry } from '../../../../platform/registry/common/platform.js';
import { ViewContainerLocation, IViewContainersRegistry, Extensions as ViewContainerExtensions } from '../../../common/views.js';
import { localize } from '../../../../nls.js';

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

		// spike: only register view container identifiers, not full panels
		// full view pane implementations will be completed in subsequent tasks

		const viewContainerIds = [
			'terminal.dashboard',
			'terminal.teaching',
			'terminal.example',
			'terminal.homework',
		];

		const viewContainerTitles = [
			localize('dashboard', 'Dashboard'),
			localize('teaching', 'Teaching'),
			localize('example', 'Example'),
			localize('homework', 'Homework'),
		];

		for (let i = 0; i < viewContainerIds.length; i++) {
			viewContainersRegistry.registerViewContainer(
				{
					id: viewContainerIds[i],
					ctorDescriptor: undefined!, // spike: placeholder, no ctor provided
					title: { value: viewContainerTitles[i], original: viewContainerTitles[i] },
					storageId: `${viewContainerIds[i]}.state`,
					hideIfEmpty: true,
				},
				ViewContainerLocation.Sidebar
			);
		}
	}
}
