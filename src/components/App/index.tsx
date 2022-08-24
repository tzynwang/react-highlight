import React, { memo, useState, useRef, useEffect, useMemo } from 'react';
import './styles.css';
import type { Raw, MarkIndex } from './types';

function App(): React.ReactElement {
  /* States */
  const [content, setContent] = useState<string>('');
  const [markRange, setMarkRange] = useState<number[][]>([]);
  const mainSpanRef = useRef<HTMLSpanElement | null>(null);

  /* Functions */
  const handleSelectRange = (): void => {
    const selection = document.getSelection();
    if (!selection) return;
    if (selection.isCollapsed) return;

    const range = selection.getRangeAt(0);
    const highlightSpan = document.createElement('span');
    highlightSpan.className = 'highlight';
    highlightSpan.appendChild(range.extractContents());
    range.insertNode(highlightSpan);

    selection.removeAllRanges();
  };
  const calculateHighlightArea = (): void => {
    if (!mainSpanRef.current?.childNodes) return;
    const { childNodes } = mainSpanRef.current;

    if (childNodes.length === 1) {
      // INFO: 沒有螢光筆標註區塊
      setMarkRange([]);
    } else {
      const raw: Raw[] = [];
      childNodes.forEach((node) => {
        if (node.textContent) {
          // INFO: 跳過空的節點
          raw.push({
            type: node.nodeType,
            length: node.textContent.length,
          });
        }
      });
      const raw2: MarkIndex[] = raw.map((r, index) => ({
        ...r,
        index,
        range: [],
      }));

      const markIndex: MarkIndex[] = [];
      raw2.forEach((markInfo, index) => {
        if (index === 0) {
          markIndex.push({ ...markInfo, range: [0, markInfo.length] });
        } else {
          markIndex.push({
            ...markInfo,
            range: [
              markIndex[index - 1].range[1],
              markIndex[index - 1].range[1] + markInfo.length,
            ],
          });
        }
      });

      // INFO: 濾掉 nodeType 為 3 的純文字節點，只留下螢光筆標註的範圍資訊
      const final = markIndex
        .filter((mark) => mark.type === 1)
        .map((rest) => rest.range);
      setMarkRange(final);
    }
  };

  /* Views */
  const RenderContent = useMemo(() => {
    if (!markRange.length) {
      return <React.Fragment>{content}</React.Fragment>;
    }

    // INFO: 補齊螢光筆以外的純文字範圍始末點
    const allRanges: number[][] = [];
    if (markRange[0][0] === 0) {
      markRange.forEach((r, index) => {
        if (index === 0) {
          allRanges.push([...r, 1]);
        } else {
          allRanges.push([markRange[index - 1][1], markRange[index][0]]);
          allRanges.push([...r, 1]);
        }
      });
      allRanges.push([markRange[markRange.length - 1][1], content.length]);
    } else {
      allRanges.push([0, markRange[0][0]]);
      markRange.forEach((r, index) => {
        if (index === 0) {
          allRanges.push([...r, 1]);
        } else {
          allRanges.push([markRange[index - 1][1], markRange[index][0]]);
          allRanges.push([...r, 1]);
        }
      });
      allRanges.push([markRange[markRange.length - 1][1], content.length]);
    }

    return (
      <React.Fragment>
        {allRanges.map((range, index) => {
          if (range.length === 2) {
            // INFO: 純文字節點
            return (
              <React.Fragment key={index}>
                {content.slice(range[0], range[1])}
              </React.Fragment>
            );
          } else {
            // INFO: 螢光筆標註區塊
            return (
              <span className="highlight" key={index}>
                {content.slice(range[0], range[1])}
              </span>
            );
          }
        })}
      </React.Fragment>
    );
  }, [content]);

  /* Hooks */
  useEffect(() => {
    setContent(
      `有麼中以相人大黃生製一非代解只應統級戰投面觀海國參軍一北圖展趣：了不英需同作作場是禮遊條星年食導命地裡，試起二以約種於強不提的股錯究公能流子，經了得。得來念十自能，要未量直辦日之治代了新系灣北媽好大有手的。發無書報親樂提職元出然小爸先力客病方所如成性所天館雨上簡可！斯母手通一今點業觀引利聲深星也上光女，試同現；有方點李古應，濟飯在單方們作夜行石方術由讓便，及然青，知個使視背天行過子依形高？都了機；讀情一時亞要，息際覺方使面文笑調法開出事怎童的？或覺界下能廠麼一，個形種。正就好一直無事，不死三元目我法解牛取此遠了石，的心房以財有題教的樂，品靈級。應了名支。我後樣紀念星與球麼其分進學節料：起度電外明氣一體一該內亞位。`
    );
    setMarkRange([
      [3, 14],
      [16, 19],
    ]);
  }, []);

  /* Main */
  return (
    <React.Fragment>
      <div>
        <h1>highlight demo</h1>
      </div>
      <div>
        <button type="button" onClick={calculateHighlightArea}>
          calculate highlight areas
        </button>
      </div>
      <div onClick={handleSelectRange}>
        <span id="main" ref={mainSpanRef}>
          {RenderContent}
        </span>
      </div>
      <div>
        <h2>highlight range:</h2>
      </div>
      <div>
        <span className="markRangeResult">
          {markRange.map((range, index) => (
            <span key={index}>
              {range[0]}, {range[1]}
            </span>
          ))}
        </span>
      </div>
    </React.Fragment>
  );
}

export default memo(App);
