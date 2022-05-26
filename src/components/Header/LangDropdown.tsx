import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { GlobeAltIcon } from "@heroicons/react/outline";
import { Fragment } from "react";
import flagId from 'images/id.png'
import flagEn from 'images/eng.png'

export const headerLanguage = [
  {
    id: "ID",
    name: "Indonesia",
    description: "",
    href: "##",
    icon: flagId,
    active: true,
  },
  {
    id: "EN",
    name: "English",
    description: "",
    href: "##",
    icon: flagEn,
  },
];

export default function LangDropdown() {
  return (
    <div className="LangDropdown">
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "" : "text-opacity-80"}
             group px-3 py-1.5  border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 rounded-full inline-flex items-center text-sm text-gray-700 dark:text-neutral-300 font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >

              <img src={headerLanguage[0].icon} alt="flag" className="w-7 h-5 object-fill" />
              <ChevronDownIcon
                className={`${open ? "-rotate-180" : "text-opacity-70"}
                  ml-2 h-4 w-4  group-hover:text-opacity-80 transition ease-in-out duration-150`}
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-[280px] px-2 mt-3 right-0 sm:px-0">
                <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid gap-5 bg-white dark:bg-neutral-800 p-7 lg:grid-cols-2">
                    {headerLanguage.map((item, index) => (
                      <a
                        key={index}
                        href={item.href}
                        onClick={() => close()}
                        className={`flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 ${item.active
                          ? "bg-gray-100 dark:bg-neutral-700"
                          : "opacity-80"
                          }`}
                      >
                        <div className="row-start-1">
                          <img src={item.icon} alt="flag" className="w-7 h-5 object-fill" />
                          <p className="text-sm font-medium ">{item.name}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
