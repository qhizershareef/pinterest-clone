import React,{useEffect,useState} from 'react';
import ImageComponent from "./ImageComponent";
import '../styles/Main.css';
import '../styles/responsive.css';
import { useDispatch, useSelector } from 'react-redux';
import { getPins } from '../actions/pinsActions';
import Loader from './Loader';

function  Main () { 
    
    const dispatch = useDispatch();

    const pinsData = useSelector(state=> state.getPins);
    const {loading, pins, error} = pinsData;

    useEffect(()=>{
        dispatch(getPins())
    },[dispatch])
    return (
        <div>
            {
                loading 
                    &&
                <div className="loader_Main">
                    <Loader pinscreen={true}/>
                </div>
            }
            <div className="Pinterest_Images">
                
                {
                    pins && pins.map(pin=>
                            <ImageComponent pinData={pin} key={pin._id}/>
                        )
                }
                
           </div>
        </div>
    )
}

export default Main;

// <ImageComponent url={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp2875577.jpg&f=1&nofb=1"}/>
//                 <ImageComponent url={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp2875577.jpg&f=1&nofb=1"}/>
//                 <ImageComponent url={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp2875577.jpg&f=1&nofb=1"}/>
//                 <ImageComponent url={"https://i.pinimg.com/564x/4d/a8/92/4da89214db7fcd3bb048fd5e52bde84e.jpg"}/>
//                 <ImageComponent url={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp2875577.jpg&f=1&nofb=1"}/>
//                 <ImageComponent url={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp2875577.jpg&f=1&nofb=1"}/>
//                 <ImageComponent url={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp2875577.jpg&f=1&nofb=1"}/>
//                 <ImageComponent url={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp2875577.jpg&f=1&nofb=1"}/>
//                 <ImageComponent url={"https://i.pinimg.com/564x/4d/a8/92/4da89214db7fcd3bb048fd5e52bde84e.jpg"}/>
//                 <ImageComponent url={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp2875577.jpg&f=1&nofb=1"}/>
//                 <ImageComponent url={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp2875577.jpg&f=1&nofb=1"}/>
//                 <ImageComponent url={"https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzQxNDV8MXwxfGFsbHwxfHx8fHx8Mnx8MTYyMjA5NjUxNA&ixlib=rb-1.2.1&q=80&w=1080"}/>
//                 <ImageComponent url={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp2875577.jpg&f=1&nofb=1"}/>
//                 <ImageComponent url={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp2875577.jpg&f=1&nofb=1"}/>
//                 <ImageComponent url={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp2875577.jpg&f=1&nofb=1"}/>
//                 <ImageComponent url={"https://i.pinimg.com/564x/4d/a8/92/4da89214db7fcd3bb048fd5e52bde84e.jpg"}/>
//                 <ImageComponent url={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp2875577.jpg&f=1&nofb=1"}/>
//                 <ImageComponent url={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp2875577.jpg&f=1&nofb=1"}/>
//                 <ImageComponent url={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp2875577.jpg&f=1&nofb=1"}/>
//                 <ImageComponent url={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp2875577.jpg&f=1&nofb=1"}/>
//                 <ImageComponent url={"https://i.pinimg.com/564x/4d/a8/92/4da89214db7fcd3bb048fd5e52bde84e.jpg"}/>
//                 <ImageComponent url={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp2875577.jpg&f=1&nofb=1"}/>
//                 <ImageComponent url={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp2875577.jpg&f=1&nofb=1"}/>
//                 <ImageComponent url={"https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzQxNDV8MXwxfGFsbHwxfHx8fHx8Mnx8MTYyMjA5NjUxNA&ixlib=rb-1.2.1&q=80&w=1080"}/>
//                 <ImageComponent url={"https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzQxNDV8MXwxfGFsbHwxfHx8fHx8Mnx8MTYyMjA5NjUxNA&ixlib=rb-1.2.1&q=80&w=1080"}/>
//                 <ImageComponent url={"https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzQxNDV8MXwxfGFsbHwxfHx8fHx8Mnx8MTYyMjA5NjUxNA&ixlib=rb-1.2.1&q=80&w=1080"}/>
//                 <ImageComponent url={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp2875577.jpg&f=1&nofb=1"}/>
//                 <ImageComponent url={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp2875577.jpg&f=1&nofb=1"}/>
//                 <ImageComponent url={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp2875577.jpg&f=1&nofb=1"}/>
//                 <ImageComponent url={"https://i.pinimg.com/564x/4d/a8/92/4da89214db7fcd3bb048fd5e52bde84e.jpg"}/>
//                 <ImageComponent url={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp2875577.jpg&f=1&nofb=1"}/>
//                 <ImageComponent url={"https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzQxNDV8MXwxfGFsbHwxfHx8fHx8Mnx8MTYyMjA5NjUxNA&ixlib=rb-1.2.1&q=80&w=1080"}/>
//                 <ImageComponent url={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp2875577.jpg&f=1&nofb=1"}/>
//                 <ImageComponent url={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp2875577.jpg&f=1&nofb=1"}/>
//                 <ImageComponent url={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp2875577.jpg&f=1&nofb=1"}/>
//                 <ImageComponent url={"https://i.pinimg.com/564x/4d/a8/92/4da89214db7fcd3bb048fd5e52bde84e.jpg"}/>
//                 <ImageComponent url={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp2875577.jpg&f=1&nofb=1"}/>
//                 <ImageComponent url={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp2875577.jpg&f=1&nofb=1"}/>
//                 <ImageComponent url={"https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzQxNDV8MXwxfGFsbHwxfHx8fHx8Mnx8MTYyMjA5NjUxNA&ixlib=rb-1.2.1&q=80&w=1080"}/>
//                 <ImageComponent url={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp2875577.jpg&f=1&nofb=1"}/>
//                 <ImageComponent url={"https://i.pinimg.com/564x/4d/a8/92/4da89214db7fcd3bb048fd5e52bde84e.jpg"}/>
//                 <ImageComponent url={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp2875577.jpg&f=1&nofb=1"}/>
//                 <ImageComponent url={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp2875577.jpg&f=1&nofb=1"}/>
//                 <ImageComponent url={"https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzQxNDV8MXwxfGFsbHwxfHx8fHx8Mnx8MTYyMjA5NjUxNA&ixlib=rb-1.2.1&q=80&w=1080"}/>
//                 <ImageComponent url={"https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzQxNDV8MXwxfGFsbHwxfHx8fHx8Mnx8MTYyMjA5NjUxNA&ixlib=rb-1.2.1&q=80&w=1080"}/>