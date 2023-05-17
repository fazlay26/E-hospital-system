
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import chair from '../../assets/images/chair.png'
import bg from '../../assets/images/bg.png'

const AppointmentBanner = ({ date, setDate }) => {
    //const [date, setDate] = useState(new Date()) //new Date()=ajker diner date ta pabo
    return (
        <div style={{
            background: `url(${bg})`,
            backgroundSize: 'cover'
        }} class="hero min-h-screen ">
            <div class="hero-content flex-col lg:flex-row-reverse">
                <img src={chair} class="max-w-sm rounded-lg shadow-2xl" alt='' />
                <div className='mr-20'>
                    <DayPicker
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                    />

                </div>
            </div>
        </div>
    );
};

export default AppointmentBanner;