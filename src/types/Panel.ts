export type Panel = {
  panelName: string;
  collectionMethod: string;
  biomarkers: string[];
};

/**
 * Note: This store is for development purposes only
 *  as there is no existing API route to create new panels &
 *  then retrieve them.
 */
export type ClientSidePanelList = {
  panels: Panel[] | [];
};
