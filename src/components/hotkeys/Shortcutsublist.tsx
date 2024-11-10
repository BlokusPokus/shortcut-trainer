import React, { useState } from 'react';

const cursorCategories = [
  'banner',
  'breadcrumbs',
  'debug',
  'editor',
  'editorColumnSelection',
  'editorHasMultipleSelections',
  'editorHasSelection',
  'file',
  'inputFocus',
  'inReferenceSearchEditor',
  'isInDiffEditor',
  'list',
  'navigat',
  'suggest',
  'textInputFocus',
  'view',
  'workbench',
];

export const Shortcutsublist = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      }
      return [...prev, category];
    });
  };

  return (
    <div>
      <div className="Shortcutpicked">
        <fieldset className="Shortcutpicked-categories">
          <legend>Select Categories</legend>
          {cursorCategories.map(category => (
            <label key={category} className="category-label">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              {category}
            </label>
          ))}
        </fieldset>
      </div>
    </div>
  );
};
