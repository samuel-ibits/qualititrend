import React, { useState } from 'react';

interface Item {
  label: string;
  checked: boolean;
}

interface SectionProps {
  title: string;
  items: Item[];
  onAdd: (label: string) => void;
}

const Section: React.FC<SectionProps> = ({ title, items, onAdd }) => {
  const [newItem, setNewItem] = useState('');

  const handleAdd = () => {
    if (newItem.trim()) {
      onAdd(newItem.trim());
      setNewItem('');
    }
  };

  return (
    <div className="p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-2 p-4 bg-orange-100">{title}</h3>
      <div className="mb-3">
        {items.map((item, index) => (
          <label key={index} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={item.checked}
              className="text-orange-500"
              readOnly
            />
            <span>{item.label}</span>
          </label>
        ))}
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder={`Enter ${title.toLowerCase()}`}
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          className="border border-gray-300 rounded-lg px-2 py-1"
        />
        <button
          onClick={handleAdd}
          className="bg-orange-500 text-white rounded-full p-2"
        >
          ➔
        </button>
      </div>
      <button className="text-orange-500 mt-2 text-sm">+ Add {title}</button>
      <button className="text-red-500 mt-2 text-sm">Remove</button>
    </div>
  );
};

const ProjectSettings: React.FC = () => {
  const [projectTypes, setProjectTypes] = useState<Item[]>([
    { label: 'Building', checked: true },
    { label: 'Concrete', checked: true },
    { label: 'Furniture', checked: false },
  ]);

  const handleAddProjectType = (label: string) => {
    setProjectTypes([...projectTypes, { label, checked: false }]);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <Section title="Project Code Suffix" items={[]} onAdd={() => {}} />
      <Section
        title="Create Project Type"
        items={projectTypes}
        onAdd={handleAddProjectType}
      />
      <Section title="Add Project Status" items={[]} onAdd={() => {}} />
      <Section title="Add Building Purpose" items={[]} onAdd={() => {}} />
      <Section title="Add Unit Type" items={[]} onAdd={() => {}} />
      <Section title="Add Other Rooms" items={[]} onAdd={() => {}} />
      <Section title="Create Furniture Type" items={[]} onAdd={() => {}} />
      <Section title="Create Concrete Type" items={[]} onAdd={() => {}} />
    </div>
  );
};

export default ProjectSettings;
