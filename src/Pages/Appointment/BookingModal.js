import React from 'react';
import { format } from 'date-fns';
import auth from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast, ToastContainer } from 'react-toastify';

const BookingModal = ({ treatment, date, setTreatment, refetch }) => {
    const [user, loading, error] = useAuthState(auth);
    const formattedDate = format(date || new Date(), 'PP')
    const handleBooking = e => {
        e.preventDefault()
        const slot = e.target.slot.value

        console.log(slot);
        const booking = {
            treatmentId: treatment._id,
            treatment: treatment.name,
            date: formattedDate,
            slot: slot,
            price: treatment.price,
            patient: user?.displayName,
            patientEmail: user?.email,
            phone: e.target.phone.value
        }
        fetch('http://localhost:5000/booking', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.success) {
                    toast(`Appointment is set,${formattedDate} at ${slot}`)
                }
                else {
                    toast.error(`Already have an Appointment on,${data.booking?.date} at ${data.booking?.slot}`)
                }
                refetch()
                setTreatment(null) //booking deyar por modal ta close hoye jabe
            })
    }
    return (
        <div>
            <input type="checkbox" id="booking-modal" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box">
                    <label for="booking-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 class="font-bold text-lg text-secondary">{treatment.name}</h3>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-2 justify-items-center'>
                        <input type="text" disabled value={format(date, 'PP')} placeholder="Type here" class="input input-bordered w-full max-w-xs" />
                        <select name='slot' class="select select-bordered w-full max-w-xs">
                            {
                                treatment.slots.map((slot, index) => <option key={index}>{slot}</option>)
                            }
                        </select>
                        <input name='name' type="text" value={user?.displayName} placeholder="Your Name" class="input input-bordered w-full max-w-xs" />
                        <input name='email' value={user?.email} type="email" placeholder="Email" class="input input-bordered w-full max-w-xs" />
                        <input name='phone' type="text" placeholder="Phone Number" class="input input-bordered w-full max-w-xs" />
                        <input type="submit" value="SUBMIT" class="btn btn-secondary w-full max-w-xs" />
                    </form>

                </div>
            </div>
        </div>
    );
};

export default BookingModal;