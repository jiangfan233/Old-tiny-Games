import {
  ReactNode,
  SetStateAction,
  Suspense,
  useCallback,
  useMemo,
  useState,
} from "react";
import React from "react";
import { JSX } from "react/jsx-runtime";

const SnakeView = React.lazy(() => import("./snake/view"));
const TetrisView = React.lazy(() => import("./tetris/view"));

interface ViewObj {
  key: string;
  comp: SetStateAction<JSX.Element>;
}

export default function App() {
  const tetrisView = useMemo(() => <TetrisView />, []);
  const snakeView = useMemo(() => <SnakeView />, []);

  const ViewArr = useMemo(
    () => [
      { key: "tetris", comp: tetrisView },
      { key: "snake", comp: snakeView },
    ],
    [tetrisView, snakeView]
  );

  const [view, setView] = useState<ViewObj>(ViewArr[0]);

  const handleClick = useCallback(
    (e: MouseEvent, viewObj: ViewObj) => {
      e.preventDefault();
      setView(viewObj);
      document.documentElement.focus();
    },
    [view, setView]
  );

  const radios = (
    <ul>
      {ViewArr.map((viewObj) => (
        <li key={viewObj.key}>
          <label style={{ color: "black", cursor: "pointer" }}>
            <button
              name="selector"
              onClick={(e: any) =>
                handleClick(e, viewObj)
              }
            >
            {viewObj.key}
            </button>
          </label>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      {/* should be a Loading component */}
      <Suspense fallback={null}>{view.comp as ReactNode}</Suspense>
      {radios}
    </div>
  );
}
