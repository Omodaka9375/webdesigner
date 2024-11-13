
//import { BsGithub } from "react-icons/bs";
import SettingsDialog from './SettingsDialog';
import {SettingContext} from '../contexts/SettingContext'
import {useContext, useState} from 'react';
// import OutputSettingsSection from './OutputSettingsSection';
// import {GeneratedCodeConfig} from '../types'
import { MdOutlineHelp } from "react-icons/md";


export default () => {
  const { settings, setSettings } = useContext(SettingContext);
  return (
    <header className="flex items-center p-4 justify-between">
      <div>
        {/* <h1 className='text-3xl font-bold text-neutral-50'>WebDesigner</h1> */}
        <img className="w-[400px]" src="/HTMLGenerator.png" />
      </div>
      <div className="flex items-center">
        <div className="flex-1">
          <ul className="hidden md:flex float-right text-lg text-slate-700 items-center">
            <li className="mx-2">
              <span>
                <SettingsDialog settings={settings} setSettings={setSettings} />
              </span>
            </li>
            <li className="mr-2 hover:bg-slate-200 rounded-sm p-2">
                <a href="https://github.com/Omodaka9375" target="_blank" >
                  <MdOutlineHelp className="text-xl" />
                </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};
