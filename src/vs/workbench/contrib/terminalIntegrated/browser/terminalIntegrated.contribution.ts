/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { WorkbenchPhase, registerWorkbenchContribution2 } from '../../../common/contributions.js';
import { TerminalIntegratedContribution } from './terminalIntegratedContribution.js';

// Register workbench contribution for terminal integrated views
registerWorkbenchContribution2(TerminalIntegratedContribution.ID, TerminalIntegratedContribution, WorkbenchPhase.BlockStartup);
