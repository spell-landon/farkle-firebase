import { useState, useEffect } from 'react';
import { RadioGroup } from '@headlessui/react';

const colors = [
  { name: 'Pink', bgColor: 'bg-pink-500', selectedColor: 'ring-pink-500' },
  {
    name: 'Purple',
    bgColor: 'bg-purple-500',
    selectedColor: 'ring-purple-500',
  },
  { name: 'Blue', bgColor: 'bg-blue-500', selectedColor: 'ring-blue-500' },
  { name: 'Green', bgColor: 'bg-green-500', selectedColor: 'ring-green-500' },
  {
    name: 'Yellow',
    bgColor: 'bg-yellow-500',
    selectedColor: 'ring-yellow-500',
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ColorPicker({ onSelection }) {
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  useEffect(() => {
    console.log(selectedColor);
    // window.localStorage.setItem(
    //   'addPlayerColor',
    //   JSON.stringify(selectedColor)
    // );
    onSelection(selectedColor);

    // return () => {
    //   window.localStorage.setItem('addPlayerColor', JSON.stringify(colors[0]));
    // };
  }, [selectedColor]);

  return (
    <RadioGroup value={selectedColor} onChange={setSelectedColor}>
      <RadioGroup.Label className='block text-sm font-medium text-white/75'>
        Choose a player color
      </RadioGroup.Label>
      <div className='mt-4 flex items-center space-x-3 bg-white/50 p-4 rounded-md'>
        {colors.map((color) => (
          <RadioGroup.Option
            key={color.name}
            value={color}
            className={({ active, checked }) =>
              classNames(
                color.selectedColor,
                active && checked ? 'ring ring-offset-1' : '',
                !active && checked ? 'ring-2' : '',
                '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
              )
            }>
            <RadioGroup.Label as='span' className='sr-only'>
              {color.name}
            </RadioGroup.Label>
            <span
              aria-hidden='true'
              className={classNames(
                color.bgColor,
                'h-8 w-8 border border-black border-opacity-10 rounded-full'
              )}
            />
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}
