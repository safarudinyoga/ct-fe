import React, { FC, useEffect, useState } from "react";
import StayCardH from "page-components/StayCardH";
import { DEMO_STAY_LISTINGS } from "data/listings";
import ButtonClose from "shared/ButtonClose/ButtonClose";
import Checkbox from "shared/Checkbox/Checkbox";
import Pagination from "shared/Pagination/Pagination";
import TabFilters from "page-components/TabFilters";
import Heading2 from "components/Heading/Heading2";
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from 'state';
import { RootState } from 'state/reducers';

const DEMO_STAYS = DEMO_STAY_LISTINGS.filter((_, i) => i < 12);
export interface SectionGridHasMapProps {}

const SectionGridHasMap: FC<SectionGridHasMapProps> = location => {
  console.log('p.sectionGridlocation: ', location)
  const [currentHoverID, setCurrentHoverID] = useState<string | number>(-1);
  const [showFullMapFixed, setShowFullMapFixed] = useState(false);
  const state = useSelector((state: RootState) => state.hotel)
  const dispatch = useDispatch();
  const { callApiSearch, onChangeInputValue } = bindActionCreators(actionCreators, dispatch)

  return (
    <div>
      <div className="relative flex min-h-screen">
        {/* CARDSSSS */}
        <div className="min-h-screen w-full xl:w-[780px] 2xl:w-[880px] flex-shrink-0 xl:px-8 ">
          {/* <Heading2 /> */}
          <div className="mb-8 lg:mb-11">
            <TabFilters />
          </div>
          <span className="mb-5">Room Groups</span>
          <div className="grid grid-cols-1 gap-8">
              <div
              >
                <StayCardH {...location} />
              </div>
          </div>
        </div>

        {!showFullMapFixed && (
          <div
            className="flex xl:hidden items-center justify-center fixed bottom-8 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-neutral-900 text-white shadow-2xl rounded-full z-30  space-x-3 text-sm cursor-pointer"
            onClick={() => setShowFullMapFixed(true)}
          >
            <i className="text-lg las la-map"></i>
            <span>Show map</span>
          </div>
        )}

        {/* MAPPPPP */}
        <div
          className={`xl:flex-grow xl:static xl:block ${
            showFullMapFixed ? "fixed inset-0 z-50" : "hidden"
          }`}
        >
          {showFullMapFixed && (
            <ButtonClose
              onClick={() => setShowFullMapFixed(false)}
              className="bg-white absolute z-50 left-3 top-3 shadow-lg rounded-xl w-10 h-10"
            />
          )}

          <div className="fixed xl:sticky top-0 xl:top-[88px] left-0 w-full h-full xl:h-[calc(100vh-88px)] rounded-md overflow-hidden">
            <div className="absolute bottom-5 left-3 lg:bottom-auto lg:top-2.5 lg:left-1/2 transform lg:-translate-x-1/2 py-2 px-4 bg-white dark:bg-neutral-800 shadow-xl z-10 rounded-2xl min-w-max">
              <Checkbox
                className="text-xs xl:text-sm"
                name="xx"
                label="Search as I move the map"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionGridHasMap;
