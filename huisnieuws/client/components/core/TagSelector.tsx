import React, { useEffect, useState } from 'react';
import Creatable from 'react-select/creatable';
import makeAnimated from 'react-select/animated';
import getTags from '../../support/tagsHelpers';
import { Tag } from '../../types/tag';

type TagSelectorProps = {
  title: String,
  onChange: Function,
  maxAmountTags: number,
  selected: Tag[],
};

const TagSelector: React.FC<TagSelectorProps> = ({
  title, onChange, maxAmountTags, selected,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<{}[]>(selected.map((tag) => (
    {
      ...tag,
      label: tag.name,
      value: tag.name?.toLowerCase(),
    }
  )));
  const [options, setOptions] = useState<{}[]>([]);
  const animatedComponent = makeAnimated();

  const selectStyles = {
    menu: (base: any) => ({
      ...base,
      zIndex: 100,
    }),
  };

  useEffect(() => {
    getTags()
      .then((res) => {
        const options = res.data.map((tag) => ({
          ...tag,
          label: tag.name,
          value: tag.name.toLowerCase(),
        }));
        setOptions(options);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
      });
  }, []);

  const handleInput = (selectedOptions: {}[]) => {
    setSelectedOptions(selectedOptions);
    onChange(selectedOptions);
  };

  const noOptionsMessage = () => (
    selectedOptions.length === 3
      ? 'Maximaal aantal tags geselecteerd'
      : 'Tag bestaat niet'
  );

  return (
    <div className="mb-8">
      <h2 className="text-left font-medium text-gray-800 mb-1">
        {`${title} (max ${maxAmountTags})`}
      </h2>
      <div className="tag-selector">
        <Creatable
          styles={selectStyles}
          instanceId="react-select-tagselector"
          defaultValue={selectedOptions}
          components={animatedComponent}
          closeMenuOnSelect={false}
          isMulti
          closeMenuOnScroll={() => true}
          isValidNewOption={() => false}
          noOptionsMessage={noOptionsMessage}
          options={selectedOptions.length === maxAmountTags ? selectedOptions : options}
          onChange={handleInput}
        />
      </div>
    </div>
  );
};

export default TagSelector;
