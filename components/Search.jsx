import { createAutocomplete } from "@algolia/autocomplete-core";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";

// Agregar props según devuelva la API
const AutocompleteItem = ({ id, title, img }) => {
  return (
    <li
      className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
    >
      <Link href={`/Parts/${id}`} className="flex gap-4 p-4">
          <img src={img} alt={title} className="w-20 h-20 object-contain" />
          <div
            className="flex flex-col justify-center"
          >
            <h3 className="text-xl font-semibold text-gray-900">{id}</h3>
            <p className="text-xs text-gray-600">{title}</p>
          </div>
      </Link>
    </li>
  );
};

export const Search = (props) => {
  const [autocompleteState, setAutocompleteState] = useState({
    collections: [],
    isOpen: false,
  });

  const autocomplete = useMemo(
    () =>
      createAutocomplete({
        placeholder: "Busca un repuesto",
        onStateChange: ({ state }) => setAutocompleteState(state),
        getSources: () => [
          {
            sourceId: "repuestos",
            getItems: ({ query }) => {
              if (!!query) {
                return fetch(`/api/search?q=${query}`).then((response) =>
                  response.json()
                );
              }
              return [];
            },
          },
        ],
        ...props,
      }),
    [props]
  );

  const formRef = useRef(null);
  const inputRef = useRef(null);
  const panelRef = useRef(null);

  const formProps = autocomplete.getFormProps({
    inputElement: inputRef.current,
  });
  const inputProps = autocomplete.getInputProps({
    inputElement: inputRef.current,
  });

  return (
    <form ref={formRef} className="flex justify-center" {...formProps}>
      <div className="w-full flex relative p-1 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-full">
        <input
          ref={inputRef}
          className="flex p-2 pl-4 rounded-full w-full"
          type="text"
          {...inputProps}
        />
        {autocompleteState.isOpen && (
          <div
            className="absolute mt-16 top-0 left-0 border border-gray-100 z-10 bg-white overflow-hidden rounded-lg shadow-lg"
            ref={panelRef}
            {...autocomplete.getPanelProps()}
          >
            {autocompleteState.collections?.map((collection, index) => {
              const { items } = collection;

              return (
                <section key={`section-${index}`}>
                  {items.length > 0 && (
                    <ul {...autocomplete.getListProps()}>
                      {items.map((item) => (
                        <AutocompleteItem key={item.id} {...item} />
                      ))}
                    </ul>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </div>
    </form>
  );
};

