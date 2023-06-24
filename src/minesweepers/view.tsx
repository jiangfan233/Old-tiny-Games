import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MineSweepers } from "./minesweepers";
import { MaybeMine } from "./minesweepers";
import React from "react";

interface BlockViewInf {
  maybeMine: MaybeMine;
  handleClick: Function;
}

enum GameStatus {
  Normal = "😀", // mouseup
  MouseDown = "😲",
  Failed = "😵",
  Success = "😎",
  Restart = "😀",
}

const MemoBlockView = React.memo(
  function blockView({ maybeMine, handleClick }: BlockViewInf) {
    let { isShow, isClickError } = maybeMine;
    return (
      <>
        <div
          style={{
            border: "1px solid gray",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0.1rem",
            background: isShow ? (isClickError ? "red" : "white") : "",
          }}
          onClick={(event: any) => handleClick(event, maybeMine)}
          onAuxClick={(event: any) => handleClick(event, maybeMine)}
        >
          {maybeMine.toView()}
        </div>
      </>
    );
  },
  (prev, next) => {
    if (prev.handleClick !== next.handleClick) return false;
    const { isShow: prevIsShow, value: prevValue } = prev.maybeMine;
    const { isShow: nextIsShow, value: nextValue } = next.maybeMine;

    return prevIsShow === nextIsShow && nextValue === prevValue;
  }
);

const MineCountView = React.memo(({ mineCount }: { mineCount: number }) => (
  <>
    <span>{mineCount.toString().padStart(3, "0")}</span>
  </>
));

const TimerView = React.memo(
  ({ gameStatus }: { gameStatus: GameStatus }) => {
    const [timeCount, setTimeCount] = useState<number>(0);
    const timerId = useRef<number | null>(null);

    useEffect(() => {
      if (gameStatus === GameStatus.Failed) {
        clearInterval(timerId.current!);
        timerId.current = null;
        return;
      }
      if (timerId.current === null && gameStatus === GameStatus.Restart) {
        setTimeCount(0);
      }
      if (timerId.current != null) return;
      timerId.current = setInterval(() => {
        setTimeCount((t) => t + 1);
      }, 1000);

      return () => {};
    });

    return (
      <>
        <span>{timeCount.toString().padStart(3, "0")}</span>
      </>
    );
  },
  (_, { gameStatus: nextGameStatus }) => {
    if (
      nextGameStatus === GameStatus.Failed ||
      nextGameStatus === GameStatus.Restart
    ) {
      return false;
    }
    return true;
  }
);

export default function MineSweeperView() {
  const [mineSweeper, setMineSweeper] = useState(
    MineSweepers.default(10, 15, 20)
  );

  const [gameStatus, setGameStatus] = useState(GameStatus.Normal);

  const handleClick = useCallback(
    (e: any, maybeMine: MaybeMine) => {
      e.preventDefault();
      if (mineSweeper.isFailed) return;
      switch (e.button) {
        // left button
        case 0: {
          setMineSweeper((m) => {
            m.scan(maybeMine);
            if (m.isFailed) {
              setGameStatus(GameStatus.Failed);
            }
            return m.clone();
          });
          return;
        }

        // right button
        case 2: {
          mineSweeper.markMine(maybeMine);
          setMineSweeper(mineSweeper.clone());
        }
      }
    },
    [mineSweeper, setMineSweeper]
  );

  const handleMouseDown = useCallback(
    function () {
      if (mineSweeper.isFailed) return;
      setGameStatus(GameStatus.MouseDown);
    },
    [mineSweeper, gameStatus, setGameStatus]
  );

  const handleMouseUp = useCallback(
    function () {
      if (mineSweeper.isFailed) {
        setGameStatus(GameStatus.Failed);
      } else {
        setGameStatus(GameStatus.Normal);
      }
    },
    [mineSweeper, gameStatus, setGameStatus]
  );

  const restart = useCallback(() => {
    setMineSweeper(MineSweepers.default(10, 15, 20));
    setGameStatus(GameStatus.Restart);
  }, [setMineSweeper]);

  const Emoji = useMemo(
    () => (
      <div style={{ cursor: "pointer" }} onClick={restart}>
        {gameStatus}
      </div>
    ),
    [gameStatus]
  );

  useEffect(() => {
    //去掉默认的contextmenu事件，否则会和右键事件同时出现。
    document.oncontextmenu = function (e) {
      e.preventDefault();
    };
  }, []);

  return (
    <div
      className="mineSwepper-view"
      style={{
        display: "flex",
        flexDirection: "column",
        color: "black",
      }}
    >
      <div
        className="mineSweeper-header"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <MineCountView mineCount={mineSweeper.markedMineCount()} />
        {Emoji}
        <TimerView gameStatus={gameStatus} />
      </div>

      <div
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        className="mineSweeper-container"
        style={{
          display: "grid",
          gridTemplateRows: `repeat(${mineSweeper.height}, 1rem)`,
          gridTemplateColumns: `repeat(${mineSweeper.width}, 1rem)`,
          background: "#e8e7e7",
          cursor: "pointer",
          color: "black",
        }}
      >
        {mineSweeper.iterPosition().map((maybeMine, index) => (
          <>
            <MemoBlockView
              key={`${index}-${maybeMine.asKey()}`}
              maybeMine={maybeMine}
              handleClick={handleClick}
            />
          </>
        ))}

        {/* null */}
      </div>
    </div>
  );
}
