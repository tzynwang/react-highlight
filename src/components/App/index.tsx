import React, { memo, useMemo, useState, useEffect, useRef } from 'react';
import './styles.css';

function App(): React.ReactElement {
  /* States */
  const [content, setContent] = useState<string>('');
  const [range, setRange] = useState<number[]>([]);
  const mainSpanRef = useRef<HTMLSpanElement | null>(null);

  /* Functions */
  const handleSelectRange = (): void => {
    const range = document.getSelection();
    if (!range) return;
    const startParentElement = range.anchorNode
      ?.parentElement as HTMLSpanElement;
    const endParentElement = range.focusNode?.parentElement as HTMLSpanElement;
    console.info(startParentElement.id);
    console.info(endParentElement.id);

    if (
      startParentElement.id === 'main' &&
      startParentElement.id === endParentElement.id
    ) {
      const start = range.anchorOffset;
      const end = range.focusOffset;
      if (start < end) {
        setRange([start, end]);
      } else {
        setRange([end, start]);
      }
    }
    if (startParentElement.id === '0') {
      const start = range.anchorOffset;
      let end = 0;
      if (endParentElement.id === '0') {
        end = range.focusOffset;
      } else if (endParentElement.id === '1') {
        // TODO: should check end
        end = startParentElement.textContent?.length || 0 + range.focusOffset;
      } else if (endParentElement.id === '2') {
        // TODO: should check end
        const spanOneLength =
          mainSpanRef.current?.childNodes[1].textContent?.length || 0;
        end =
          startParentElement.textContent?.length ||
          0 + spanOneLength + range.focusOffset;
      }
      setRange([start, end]);
    }
  };

  /* Hooks */
  useEffect(() => {
    setContent(`Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima autem
    dolor praesentium pariatur. Ipsum quos assumenda minus, vero ad iure
    totam corrupti culpa consectetur labore, non esse voluptas. Atque,
    minus.`);
    setRange([38, 69]);
  }, []);

  /* Views */
  const HighlighArea = useMemo(() => {
    if (!range.length) {
      return <React.Fragment>{content}</React.Fragment>;
    }
    const [start, end] = range;
    if (start === 0) {
      return (
        <React.Fragment>
          <span className="highlight" id="0">
            {content.slice(0, end)}
          </span>
          <span id="1">{content.slice(end)}</span>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <span id="0">{content.slice(0, start)}</span>
        <span className="highlight" id="1">
          {content.slice(start, end)}
        </span>
        <span id="2">{content.slice(end)}</span>
      </React.Fragment>
    );
  }, [range, content]);

  /* Main */
  return (
    <React.Fragment>
      <div>
        <button type="button" onClick={() => setRange([38, 69])}>
          apply default highlight
        </button>
      </div>
      <div>
        <button type="button" onClick={() => setRange([])}>
          reset highlight area
        </button>
      </div>
      <div onClick={handleSelectRange}>
        <span id="main" ref={mainSpanRef}>
          {HighlighArea}
        </span>
      </div>
    </React.Fragment>
  );
}

export default memo(App);
