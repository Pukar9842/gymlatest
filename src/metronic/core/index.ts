/*
* Metronic
* @author: Keenthemes
* Copyright 2024 Keenthemes
*/

import Dom from './helpers/dom';
import Utils from './helpers/utils';
import EventHandler from './helpers/event-handler';
import { Menu } from './components/menu';
import { Dropdown } from './components/dropdown';
import { Modal } from './components/modal';
import { Drawer } from './components/drawer';
import { Collapse } from './components/collapse';
import { Dismiss } from './components/dismiss';
import { Tabs } from './components/tabs';
import { Accordion } from './components/accordion';
import { Scrollspy } from './components/scrollspy';
import { Scrollable } from './components/scrollable';
import { Scrollto } from './components/scrollto';
import { Sticky } from './components/sticky';
import { Reparent } from './components/reparent';
import { Toggle } from './components/toggle';
import { Tooltip } from './components/tooltip';
import { Stepper } from './components/stepper';
import { Theme } from './components/theme';
import { ImageInput } from './components/image-input';
import { TogglePassword } from './components/toggle-password';
import { DataTable } from './components/datatable';

export { Menu } from './components/menu';
export { Dropdown } from './components/dropdown';
export { Modal } from './components/modal';
export { Drawer } from './components/drawer';
export { Collapse } from './components/collapse';
export { Dismiss } from './components/dismiss';
export { Tabs } from './components/tabs';
export { Accordion } from './components/accordion';
export { Scrollspy } from './components/scrollspy';
export { Scrollable } from './components/scrollable';
export { Scrollto } from './components/scrollto';
export { Sticky } from './components/sticky';
export { Reparent } from './components/reparent';
export { Toggle } from './components/toggle';
export { Tooltip } from './components/tooltip';
export { Stepper } from './components/stepper';
export { Theme } from './components/theme';
export { ImageInput } from './components/image-input';
export { TogglePassword } from './components/toggle-password';
export { DataTable } from './components/datatable';

const Components = {
	init(): void {
		Menu.init();
		Dropdown.init();
		Modal.init();
		Drawer.init();
		Collapse.init();
		Tabs.init();
		Accordion.init();
		Scrollspy.init();
		Scrollable.init();
		Scrollto.init();
		Sticky.init();
		Reparent.init();
		Toggle.init();
		Tooltip.init();
		Stepper.init();
		Theme.init();
		ImageInput.init();
		TogglePassword.init();
		DataTable.init();
	}
};

declare global {
	interface Window {
		Utils: typeof Utils;
		Dom: typeof Dom;
		EventHandler: typeof EventHandler;
		Menu: typeof Menu;
		Dropdown: typeof Dropdown;
		Modal: typeof Modal;
		Drawer: typeof Drawer;
		Collapse: typeof Collapse;
		Dismiss: typeof Dismiss;
		Tabs: typeof Tabs;
		Accordion: typeof Accordion;
		Scrollspy: typeof Scrollspy;
		Scrollable: typeof Scrollable;
		Scrollto: typeof Scrollto;
		Sticky: typeof Sticky;
		Reparent: typeof Reparent;
		Toggle: typeof Toggle;
		Tooltip: typeof Tooltip;
		Stepper: typeof Stepper;
		Theme: typeof Theme;
		ImageInput: typeof ImageInput;
		TogglePassword: typeof TogglePassword;
		DataTable: typeof DataTable;
		Components: typeof Components;
	}
}

window.Utils = Utils;
window.Dom = Dom;
window.EventHandler = EventHandler;
window.Menu = Menu;
window.Dropdown = Dropdown;
window.Modal = Modal;
window.Drawer = Drawer;
window.Collapse = Collapse;
window.Dismiss = Dismiss;
window.Tabs = Tabs;
window.Accordion = Accordion;
window.Scrollspy = Scrollspy;
window.Scrollable = Scrollable;
window.Scrollto = Scrollto;
window.Sticky = Sticky;
window.Reparent = Reparent;
window.Toggle = Toggle;
window.Tooltip = Tooltip;
window.Stepper = Stepper;
window.Theme = Theme;
window.ImageInput = ImageInput;
window.TogglePassword = TogglePassword;
window.DataTable = DataTable;
window.Components = Components;

export default Components;

Dom.ready(() => {
	Components.init();
});
