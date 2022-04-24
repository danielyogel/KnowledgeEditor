import React from 'react';
import { unsafeUpdateAt, unsafeDeleteAt, unsafeInsertAt } from '../utils';
import { BlocksMenu } from './internals/BlocksMenu';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { closestCenter, DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { NodeView } from './internals/NodeView';
import { Blocks } from './Blocks';

export type NodeValue = {
  id: string;
  kind: typeof Blocks[number]['kind'];
  content: string;
};

type Params = {
  value: Array<NodeValue>;
  onChange: React.Dispatch<React.SetStateAction<NodeValue[]>>;
};

export function SemanticBlocks({ value, onChange }: Params) {
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  return (
    <div>
      <div>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={event => {
            const { active, over } = event;
            if (over && active.id !== over.id) {
              const oldIndex = value.findIndex(i => i.id === active.id);
              const newIndex = value.findIndex(i => i.id === over.id);
              onChange(v => arrayMove(v, oldIndex, newIndex));
            }
          }}
        >
          <SortableContext items={value.map(m => m)}>
            {value.map((currNode, index) => {
              return (
                <NodeView
                  key={currNode.id}
                  node={currNode}
                  onChange={node => onChange(value => [...unsafeUpdateAt(index, node, value)])}
                  onDelete={() => onChange(value => unsafeDeleteAt(index, value))}
                  onAdd={node => onChange(value => unsafeInsertAt(index + 1, node, value))}
                />
              );
            })}
          </SortableContext>
        </DndContext>
      </div>

      <div>{!value.length && <BlocksMenu onSelect={node => onChange(value => [...value, node])} />}</div>
    </div>
  );
}
