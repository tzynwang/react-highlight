import React, { memo, useState, useRef, useEffect, useMemo } from 'react';
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
    if (range.anchorOffset === range.focusOffset) return;

    const startElement = range.anchorNode?.parentElement as HTMLSpanElement;
    const endElement = range.focusNode?.parentElement as HTMLSpanElement;

    if (startElement.id === 'main' && startElement.id === endElement.id) {
      const start = range.anchorOffset;
      const end = range.focusOffset;
      if (start < end) {
        setRange([start, end]);
      } else {
        setRange([end, start]);
      }
    }

    if (startElement.id === '0') {
      const start = range.anchorOffset;
      if (endElement.id === '0') {
        const end = range.focusOffset;
        setRange([start, end]);
      } else if (endElement.id === '1') {
        const end = (startElement.textContent?.length || 0) + range.focusOffset;
        setRange([start, end]);
      } else if (endElement.id === '2') {
        const spanOneLength =
          mainSpanRef.current?.childNodes[1].textContent?.length || 0;
        const end =
          (startElement.textContent?.length || 0) +
          spanOneLength +
          range.focusOffset;
        setRange([start, end]);
      }
    }

    if (startElement.id === '1') {
      if (endElement.id === '0') {
        const start = range.focusOffset;
        const end = (endElement.textContent?.length || 0) + range.anchorOffset;
        setRange([start, end]);
      } else if (endElement.id === '1') {
        const spanZeroLength =
          mainSpanRef.current?.childNodes[0].textContent?.length || 0;
        const start = spanZeroLength + range.anchorOffset;
        const end = spanZeroLength + range.focusOffset;
        if (start > end) {
          setRange([end, start]);
        } else {
          setRange([start, end]);
        }
      } else if (endElement.id === '2') {
        const spanZeroLength =
          mainSpanRef.current?.childNodes[0].textContent?.length || 0;
        const spanOneLength =
          mainSpanRef.current?.childNodes[1].textContent?.length || 0;
        const start = spanZeroLength + range.anchorOffset;
        const end = spanZeroLength + spanOneLength + range.focusOffset;
        setRange([start, end]);
      }
    }

    if (startElement.id === '2') {
      const spanZeroLength =
        mainSpanRef.current?.childNodes[0].textContent?.length || 0;
      const spanOneLength =
        mainSpanRef.current?.childNodes[1].textContent?.length || 0;
      if (endElement.id === '0') {
        const start = range.focusOffset;
        const end = spanZeroLength + spanOneLength + range.anchorOffset;
        setRange([start, end]);
      } else if (endElement.id === '1') {
        const start = spanZeroLength + range.focusOffset;
        const end = spanZeroLength + spanOneLength + range.anchorOffset;
        setRange([start, end]);
      } else if (endElement.id === '2') {
        const start = spanZeroLength + spanOneLength + range.anchorOffset;
        const end = spanZeroLength + spanOneLength + range.focusOffset;
        if (start < end) {
          setRange([start, end]);
        } else {
          setRange([end, start]);
        }
      }
    }

    range.removeAllRanges();
  };

  /* Hooks */
  useEffect(() => {
    setContent(`Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta
    exercitationem alias atque vitae deserunt, accusamus tenetur in
    necessitatibus, dolorem illum neque at? Atque numquam earum eum possimus
    commodi ipsum iusto quo, minima, rem aliquid mollitia cum ab fuga vel soluta
    laboriosam ea inventore sed iure id, dolores dolore suscipit? Tempora sunt
    libero, dolore explicabo reprehenderit dolor dolorem quia quos voluptatibus
    nam qui. Nam et corporis repellat ad facilis id cupiditate nisi. Repellat,
    dolorem cum! Nobis, perferendis eaque tempora quis non corporis error eum, a
    quae explicabo sit id officiis voluptates nostrum incidunt eius beatae vero.
    Expedita consequatur at obcaecati nisi blanditiis itaque cumque culpa, ipsam
    molestiae similique, ullam corporis voluptas facere numquam iste tempora.
    Mollitia rem quisquam dolores, ipsum aliquid, repellendus corporis dolor
    esse itaque magnam, sapiente eligendi iste blanditiis praesentium nihil
    veniam autem. Tenetur autem quisquam perferendis maiores reiciendis vel
    illum totam quibusdam voluptatum nesciunt natus provident cumque esse odit
    impedit, minus earum sit consectetur minima optio. Voluptates reprehenderit
    soluta et laudantium eius rerum fugiat velit ipsum doloremque possimus quod
    officia beatae eveniet repellat labore odio dolorum, maxime molestias
    distinctio est error incidunt? Aliquam mollitia animi magnam sapiente sint
    corporis illum aut enim quidem voluptatum quaerat deserunt, voluptatem
    explicabo nam nulla dolores adipisci, qui veniam facilis fugit consequatur
    tempore ab necessitatibus. Reprehenderit, inventore! Fugit, perferendis
    tempora officia ducimus non vero nulla dolores rerum ipsa nesciunt commodi
    asperiores exercitationem aperiam fugiat obcaecati numquam quos voluptate
    autem nisi debitis reiciendis possimus. Libero dignissimos in nostrum quasi
    labore architecto ducimus delectus doloribus culpa consequuntur ad amet
    facilis ratione, repellendus esse suscipit sed quibusdam sapiente commodi!
    Placeat voluptatem sequi inventore ipsa quis exercitationem! Magnam
    laudantium cupiditate repudiandae vel ratione atque eos animi beatae
    molestiae, id numquam quidem assumenda corporis voluptas in minima
    dignissimos distinctio, asperiores eius. Alias saepe facilis itaque
    excepturi, consequuntur dicta!`);
    setRange([37, 176]);
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
        <h1>highlight demo</h1>
      </div>
      <div>
        <button type="button" onClick={() => setRange([37, 176])}>
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
