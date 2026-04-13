/*---------------------------------------------------------------------------------------------
 *  Copyright (c) AlgoCoach. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Contest Dock Spike - Contribution
 *
 * Spike-level contribution point for Contest Dock view container.
 * Registers the view container and view in the sidebar.
 */

import { Registry } from 'vs/platform/registry/common/platform';
import { IViewContainersRegistry, ViewContainerLocation, IViewsRegistry, Extensions as ViewContainerExtensions } from 'vs/workbench/common/views';
import { ViewPaneContainer } from 'vs/workbench/browser/parts/views/viewPaneContainer';
import { SyncDescriptor } from 'vs/platform/instantiation/common/descriptors';
import { ContestDockView } from './contestDockView';
import { localize } from 'vs/nls';

/**
 * View container ID
 */
const viewContainerId = 'terminal.contestDock';

/**
 * Register Contest Dock view container
 */
const contestDockViewContainer = Registry.as<IViewContainersRegistry>(ViewContainerExtensions.ViewContainersRegistry).registerViewContainer(
	{
		id: viewContainerId,
		title: { value: localize('contestDock', 'Contest Dock'), original: 'Contest Dock' },
		ctorDescriptor: new SyncDescriptor(ViewPaneContainer, [viewContainerId, { mergeViewWithContainerWhenSingleView: true }]),
		storageId: 'terminal.contestDock.state',
		hideIfEmpty: false,
		icon: 'codicon-compass'  // Spike: Use existing icon
	},
	ViewContainerLocation.Sidebar
);

/**
 * Register Contest Dock view
 */
Registry.as<IViewsRegistry>(ViewContainerExtensions.ViewsRegistry).registerViews(
	[{
		id: 'terminal.contestDockView',
		name: { value: localize('contestStatus', 'Contest Status'), original: 'Contest Status' },
		ctorDescriptor: new SyncDescriptor(ContestDockView),
		canToggleVisibility: true,
		canMoveView: true
	}],
	contestDockViewContainer
);

console.log('[ContestDockContribution] Registered Contest Dock view container (spike)');
