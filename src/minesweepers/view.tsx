import { useCallback, useEffect, useState } from "react";
import { MineSweepers } from "./minesweepers";
import { PosWithValue } from "./minesweepers";
import { Mine, MineInf } from "./mine";

export default function MineSweeperView() {
  const [mineSweeper, setMineSweeper] = useState(
    MineSweepers.default(10, 15, 20)
  );

  const handleClick = useCallback(
    (e: any, posWithValue: PosWithValue) => {
      e.preventDefault();
      switch (e.button) {
        // left button
        case 0: {
          setMineSweeper((m) => {
            m.scan(posWithValue);
            return m.clone();
          });
          return;
        }

        // right button
        case 2: {
        }
      }
    },
    [mineSweeper, setMineSweeper]
  );

  useEffect(() => {
    //去掉默认的contextmenu事件，否则会和右键事件同时出现。
    document.oncontextmenu = function (e) {
      e.preventDefault();
    };
  }, []);

  useEffect(() => {
    console.log("refrdasdasd");
  }, [mineSweeper]);

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateRows: `repeat(${mineSweeper.height}, 1rem)`,
          gridTemplateColumns: `repeat(${mineSweeper.width}, 1rem)`,
          background: "white",
          cursor: "pointer",
          color: "black",
        }}
      >
        {mineSweeper.positions.flatMap((row) =>
          row.map((posWithValue) => {
            let { pos, value } = posWithValue;
            let { x, y, isShow, color } = pos as MineInf;
            return (
              <>
                <div
                  style={{
                    border: "1px solid gray",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "0.1rem"
                  }}
                  key={`${x}-${y}`}
                  onClick={(event: any) => handleClick(event, posWithValue)}
                  onAuxClick={(event: any) => handleClick(event, posWithValue)}
                >
                  {isShow ? color : value > 0 ? value : null}
                </div>
              </>
            );
          })
        )}
      </div>
    </>
  );
}
