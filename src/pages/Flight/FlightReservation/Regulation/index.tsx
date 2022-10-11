import React, { FC } from 'react';
import './style.scss';

export interface RegulationProps {

}
const Regulation: FC<RegulationProps> = () => {
  return (
    <div className="card card-top-right">
        <div className="row">
            <div className="col col-md-2 col-sm-2 col-xs-2 d-flex align-items-center">
              <i className={`text-4xl text-neutral-6000 purple las la-info-circle mr-1`}></i>
            </div>
            <div className="col col-md-10 col-sm-10 col-xs-10 text-regulation">
              <span className="purple">Baca regulasi dan peraturan perjalanan serta akomodasi berkaitan dengan situasi pandemic COVID 19. Pastikan kebijakan pembatalan sesuai dengan kebutuhan</span>
            </div>
        </div>
    </div>
  )
}

export default Regulation;
