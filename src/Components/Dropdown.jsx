import * as React from 'react'
import {useCombobox, useMultipleSelection} from 'downshift'
import IconChevronDown from './IconChevronDown'
import IconChevronUp from './IconChevronUp'
import clsx from 'clsx'
import ReactDOM from 'react-dom'

// harusnya pakai DOMPurify klo utk Prod mah
function sanitizeHTML(unsafe) {
  return unsafe
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;');
}

function highlightMatch(option, searchTerm) {
  const cleanSearchTerm = sanitizeHTML(searchTerm);
  const regex = new RegExp(`(${cleanSearchTerm})`, 'gi');
  const highlightedText = option.replace(
    regex,
    '<span class="bg-teal-500">$1</span>'
  );
  return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
}

function getFilteredItems(options, selectedItems, inputValue) {
  const lowerCasedInputValue = inputValue.toLowerCase()

  const result =  options.filter(
    opt =>
      !selectedItems.includes(opt) &&
      opt.toLowerCase().includes(lowerCasedInputValue),
  )
  return result
}

export default function Dropdown({ 
  options, 
  usePortal = false, 
  alwaysOpen = false, 
  clearAll = true, 
  multiSelect = true
}) {
  const dropdownRef = React.useRef(null)
  const menuRef = React.useRef(null)
  const [openDropdownWrapper, setOpenDropdownWrapper] = React.useState(false)
  const [inputValue, setInputValue] = React.useState('');
  const initialSelectedItems = [options[0]]
  const [selectedItems, setSelectedItems] = React.useState(initialSelectedItems)
  const items = React.useMemo(
    () => getFilteredItems(options, selectedItems, inputValue),
    [selectedItems, inputValue],
  )
  
  // by default its a multiple Selectetion

  const {
    getSelectedItemProps, 
    getDropdownProps, 
    removeSelectedItem
  } = useMultipleSelection({
      selectedItems,
      onStateChange({selectedItems: newSelectedItems, type}) {
        switch (type) {
          case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownBackspace:
          case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownDelete:
          case useMultipleSelection.stateChangeTypes.DropdownKeyDownBackspace:
          case useMultipleSelection.stateChangeTypes.FunctionRemoveSelectedItem:
            setSelectedItems(newSelectedItems)
            break
          default:
            break
        }
      },
    })
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
    openMenu,
    reset,
  } = useCombobox({
    items,
    inputValue,
    selectedItem: null,
    stateReducer(state, actionAndChanges) {
      const {changes, type} = actionAndChanges
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.InputBlur:
          return {
            ...changes,
            ...(changes.selectedItem && {isOpen: true, highlightedIndex: 0}),
          }
        case useCombobox.stateChangeTypes.FunctionReset:
          return {
            ...changes,
            isOpen: true,
        }
        default:
          return changes
      }
    },
    onStateChange({
      inputValue: newInputValue,
      type,
      selectedItem: newSelectedItem,
      isOpen
    }) {
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          // handle multi select or single select
          if (multiSelect) {
            setSelectedItems([...selectedItems, newSelectedItem])
          } else {
            setSelectedItems([newSelectedItem])
          }        
          setOpenDropdownWrapper(false)
          break
        case useCombobox.stateChangeTypes.InputChange:
          setInputValue(newInputValue)
          break
        case useCombobox.stateChangeTypes.InputBlur: {
          // tutup dropdown state berbarengan dengan 
          // downshift state
          if (!isOpen) {
            setOpenDropdownWrapper(false)
          }
        }
        case useCombobox.stateChangeTypes.FunctionReset: {
          if (isOpen) {
            setOpenDropdownWrapper(true)
          }
        }
        default:
          break
      }
    },
  })

  
  const handleClearSelection = () => {
    setSelectedItems([]);
    setInputValue('')
  }

  const handleClearInput = () => {
    reset()
    setInputValue('')
  }

  const dropdownWrapper = (
    <div 
      className={clsx('w-full p-0 border border-gray-200 rounded-b-md', {
        "absolute z-10 bg-white w-[600px]": usePortal,
      })}
      style={{
        // apply position nya agar match original parent
        top: dropdownRef.current? dropdownRef.current.offsetTop + dropdownRef.current.offsetHeight: 0,
        left: dropdownRef.current? dropdownRef.current.offsetLeft: 0,
        width: dropdownRef.current? dropdownRef.current.offsetWidth: 'auto',
      }} 
      ref={menuRef}
    >
      
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <input 
          type="text" 
          id="default-search" 
          className="block w-full p-3 pl-10 pr-10 text-sm border-b text-gray-900  focus:outline-none" 
          placeholder="Masukan keyword..."
          autoFocus
          {...getInputProps(getDropdownProps({preventKeyAction: isOpen}, { suppressRefError: true }), { suppressRefError: true })}
          data-testid="combobox-input"
        />
        {inputValue && (
        <button type="button" className="absolute inset-y-0 right-0 flex items-center pr-4"
          onClick={handleClearInput}
        >
          <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        )}
      </div>
      <ul
        {...getMenuProps({}, { suppressRefError: true })}
        className={clsx('list-none w-full p-0')}    
      >
        {isOpen &&
          items.map((item, index) => (
            <li
              className={clsx('p-2 text-left cursor-pointer', {
                "bg-teal-50": highlightedIndex === index
              })}
              key={`${item}${index}`}
              {...getItemProps({
                item,
                index,
                'data-testid': `downshift-item-${index}`,
              })}
            >
              {highlightMatch(item , inputValue)}
            </li>
          ))}
      </ul>
    </div>
  );

  const handleOpenDropdown = (e) => {
    const target = e.target
    if (target.tagName !== 'BUTTON') {
      setOpenDropdownWrapper(!openDropdownWrapper)
      alwaysOpen && openMenu()
    }
  }

  return (
    <div
      ref={dropdownRef}
      className="flex flex-col w-fit justify-center mt-10 self-center"
    >
      <label
        style={{
          fontWeight: 'bolder',
          color: selectedItem ? selectedItem : 'black',
        }}
        {...getLabelProps()}
      >
        Pilih Opsi:
      </label>
      {
        /* Biasanya tambah input hidden agar bisa di kirim ke server dll */
      }
      <input type="hidden" value={selectedItems.join(',')} name="opsi" onChange={() => {} }/>
      <div
        className="flex flex-row justify-between w-full min-w-[450px] max-w-[600px] min-h-10 items-center p-2 border border-gray-300 rounded-md cursor-pointer hover:border-gray-400 hover:bg-gray-50"
        onClick={handleOpenDropdown}
      >
        <div 
          className="flex flex-wrap gap-2 cursor-pointer"
        >
          {selectedItems.map((item, index) => (
            <span
              className="bg-gray-100 px-1 rounded-md"
              key={`selected-item-${index}`}
              {...getSelectedItemProps({
                selectedItem: item,
                index,
              })}
            >
              {item}
              
              {/** remove btn jika multiple select */}
              {multiSelect && (
              <span
                className="p-1 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  removeSelectedItem(item);
                }}
              >
                &#9447;
              </span>
              )}
            </span>
          ))}
        </div>
        <div className="flex flex-row">
          <button
            className="py-1 px-2"
            aria-label="toggle menu"
            data-testid="combobox-toggle-button"
            {...getToggleButtonProps()}
          >
            {openDropdownWrapper ?  <IconChevronUp width={16} height={16} /> : <IconChevronDown width={16} height={16}/>}
          </button>
          {clearAll && selectedItems.length > 0 && (
            <button
              title="Clear opsi"
              className="py-1 px-2 "
              aria-label="clear selection"
              data-testid="clear-button"
              onClick={handleClearSelection}
            >
              &#10007;
            </button>
          )}     
        </div>
      </div>
      {openDropdownWrapper && (
        <>
          {usePortal? ReactDOM.createPortal(dropdownWrapper, document.body): dropdownWrapper}
        </>
      )}
    </div>
  )
}