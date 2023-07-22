export type Panel = {
  panelName: string;
  collectionMethod: string;
  biomarkers: { [name: string]: boolean };
};

/**
 * Note: This store is for development purposes only
 *  as there is no existing API route to create new panels &
 *  then retrieve them.
 */
export type ClientSidePanelList = {
  panels: Panel[] | [];
};
