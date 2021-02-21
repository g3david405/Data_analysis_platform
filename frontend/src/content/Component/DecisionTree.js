import React, { memo, useMemo } from 'react';
import { Group } from '@vx/group';
import { Tree, hierarchy } from '@vx/hierarchy';
import { LinkVerticalLine } from '@vx/shape';
import { LinearGradient } from '@vx/gradient';
import { Zoom } from '@vx/zoom';
import { localPoint } from '@vx/event';
import decisionTreeData from './data.json';

const background = '#F8F8F8';

const defaultMargin = { top: 50, left: 0, right: 0, bottom: 50 };
const initialTransform = {
  scaleX: 0.9,
  scaleY: 0.9,
  translateX: 0,
  translateY: 0,
  skewX: 0,
  skewY: 0,
};

const clusterData = decisionTreeData.decisionTree;

const Node = ({ node }) => {
  const isRoot = node.depth === 0;

  if (isRoot) return <RootNode node={node} />;

  const width = 200;
  const height = 70;
  const centerX = -width / 2;
  const centerY = -height / 2;

  return (
    <Group top={node.y} left={node.x}>
      {node.depth !== 0 && (
        <rect
          width={width}
          height={height}
          y={centerY}
          x={centerX}
          rx={8}
          fill={'rgba(237, 143, 52, 0.24)'}
          stroke={'#C9CACA'}
          strokeWidth={1}
        />
      )}
      <g textAnchor="middle" alignmentBaseline="middle">
        {node.data.ruleName && (
          <text
            dy="-5"
            fontSize={14}
            fontFamily="Roboto"
            textAnchor="middle"
            style={{ pointerEvents: 'none' }}
            fill={'#595757'}
          >
            {`${node.data.ruleName} <= ${Number.parseFloat(
              node.data.ruleValue
            ).toFixed(3)}`}
          </text>
        )}
        <text
          dy={node.data.ruleName ? '20' : '5'}
          fontSize={14}
          fontFamily="Roboto"
          textAnchor="middle"
          style={{ pointerEvents: 'none' }}
          fill={'#595757'}
        >
          {`value = ${Number.parseFloat(node.data.value).toFixed(3)}`}
        </text>
      </g>
    </Group>
  );
};

const RootNode = ({ node }) => {
  const width = 200;
  const height = 70;
  const centerX = -width / 2;
  const centerY = -height / 2;

  return (
    <Group top={node.y} left={node.x}>
      <rect
        width={width}
        height={height}
        y={centerY}
        x={centerX}
        rx={8}
        fill={'rgba(255, 195, 7, 0.24)'}
        stroke={'#C9CACA'}
        strokeWidth={1}
      />
      <g textAnchor="middle" alignmentBaseline="middle">
        {node.data.ruleName && (
          <text
            dy="-5"
            fontSize={14}
            fontFamily="Roboto"
            textAnchor="middle"
            style={{ pointerEvents: 'none' }}
            fill={'#595757'}
          >
            {`${node.data.ruleName} <= ${Number.parseFloat(
              node.data.ruleValue
            ).toFixed(3)}`}
          </text>
        )}
        <text
          dy={node.data.ruleName ? '20' : '5'}
          fontSize={14}
          fontFamily="Roboto"
          textAnchor="middle"
          style={{ pointerEvents: 'none' }}
          fill={'#595757'}
        >
          {`value = ${Number.parseFloat(node.data.value).toFixed(3)}`}
        </text>
      </g>
    </Group>
  );
};

const DecisionTree = ({ width, height, margin = defaultMargin }) => {
  const data = useMemo(() => hierarchy(clusterData), []);
  const xMax = useMemo(() => width - margin.left - margin.right, [
    width,
    margin,
  ]);
  const yMax = useMemo(() => height - margin.top - margin.bottom, [
    height,
    margin,
  ]);

  return width < 10 ? null : (
    <Zoom
      passive
      width={width}
      height={height}
      scaleXMin={1 / 2}
      scaleXMax={4}
      scaleYMin={1 / 2}
      scaleYMax={4}
      transformMatrix={initialTransform}
    >
      {(zoom) => (
        <svg
          width={width}
          height={height}
          style={{ cursor: zoom.isDragging ? 'grabbing' : 'grab' }}
        >
          <rect width={width} height={height} fill={background} />
          <g transform={zoom.toString()}>
            <LinearGradient id="top" />
            <Tree
              root={data}
              size={[xMax * 1.1, yMax * 1.1]}
              separation={() => 150}
            >
              {(cluster) => (
                <Group top={margin.top} left={margin.left}>
                  {cluster.links().map((link, i) => {
                    const isDecision =
                      link.source.data.value > link.target.data.value;
                    const sumX = link.source.x + link.target.x;
                    const distX = Math.abs(link.source.x - link.target.x);
                    const sumY = link.source.y + link.target.y;
                    const dx = sumX / 2;
                    const dy = sumY / 2;

                    const offset = ((dy / sumY) * distX) / 3;

                    const dxWithOffset = isDecision ? dx - offset : dx + offset;
                    const enhanceLink = {
                      ...link,
                      source: {
                        ...link.source,
                        y: link.source.y + 35,
                      },
                      target: {
                        ...link.target,
                        y: link.target.y - 45,
                      },
                    };
                    return (
                      <Group key={`cluster-path-${i}`}>
                        <LinkVerticalLine
                          key={`cluster-link-${i}`}
                          data={enhanceLink}
                          stroke="#707070"
                          strokeWidth="1"
                          fill="none"
                          markerEnd={`url(#triangle)`}
                        />
                        {i < 2 && (
                          <text
                            dx={dxWithOffset}
                            dy={dy}
                            textAnchor={isDecision ? 'end' : 'start'}
                          >
                            {isDecision ? 'True' : 'False'}
                          </text>
                        )}
                        <marker
                          id="triangle"
                          viewBox="0 0 10 10"
                          refX="10"
                          refY="5"
                          markerUnits="strokeWidth"
                          markerWidth="10"
                          markerHeight="10"
                          orient="auto"
                        >
                          <path d="M 0 0 L 10 5 L 0 10 z" fill="#707070" />
                        </marker>
                      </Group>
                    );
                  })}
                  {cluster.descendants().map((node, i) => (
                    <Node key={`cluster-node-${i}`} node={node} />
                  ))}
                </Group>
              )}
            </Tree>
          </g>
          <rect
            width={width}
            height={height}
            fill="transparent"
            onTouchStart={zoom.dragStart}
            onTouchMove={zoom.dragMove}
            onTouchEnd={zoom.dragEnd}
            onMouseDown={zoom.dragStart}
            onMouseMove={zoom.dragMove}
            onMouseUp={zoom.dragEnd}
            onMouseLeave={() => {
              if (zoom.isDragging) zoom.dragEnd();
            }}
            onDoubleClick={(event) => {
              const point = localPoint(event) || { x: 0, y: 0 };
              zoom.scale({ scaleX: 1, scaleY: 1, point });
            }}
          />
        </svg>
      )}
    </Zoom>
  );
};

export default memo(DecisionTree);
