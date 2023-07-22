import { useStateMachine } from "little-state-machine";

export function PanelsList() {
  const { getState } = useStateMachine();

  return (
    <>
      <h2>AllPanels</h2>
      <ul>
        {/* TODO: Global state for panels not typed correctly */}
        {getState().panels.map(({ panelName }, i) => (
          <li key={`${panelName}-${i}`}>{panelName}</li>
        ))}
      </ul>
    </>
  );
}
