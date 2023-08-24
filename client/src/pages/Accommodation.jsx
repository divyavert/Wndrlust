import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import Perk from '../Perk';
import axios from 'axios';
const Accommodation = () => {
  const { action } = useParams();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotolink] = useState('');
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);
  async function uploadImage(event) {
    event.preventDefault();
    const file = event.target.files;
    const data = new FormData();
    for (let i = 0; i < file.length; i++) {
      console.log({ here: file[i] });
      data.append('photos', file[i]);
    }

    const { data: fileName } = await axios.post('/upload', data, {
      headers: { 'Content-Type': 'Multipart/form-data' },
    });
    setAddedPhotos((prev) => [...prev, ...fileName]);
  }
  async function addPhotoByLink(event) {
    event.preventDefault();
    console.log('i was called');
    console.log(photoLink);
    const { data: name } = await axios.post('/uploadLink', { link: photoLink });
    console.log(name);
    setAddedPhotos((prev) => {
      return [...prev, name];
    });
    setPhotolink('');
  }
  return (
    <div>
      {action !== 'new' && (
        <div className='text-center  text-white'>
          <Link
            className=' inline-flex gap-1 bg-primary py-2 px-6 rounded-full text-white'
            to={'/account/accommodations/new'}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 4.5v15m7.5-7.5h-15'
              />
            </svg>
            Add new places
          </Link>
        </div>
      )}

      {action == 'new' && (
        <div>
          <form>
            <h2 className='text-xl mt-4'>Accommodation name</h2>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type='text'
              placeholder='accommodation name'
            />
            <h2 className='text-xl mt-4'>Address</h2>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type='text'
              placeholder='address'
            />
            <h2 className='text-xl mt-4'>Photos</h2>
            <div className='flex gap-1'>
              <input
                type='text'
                placeholder='add photo using link'
                value={photoLink}
                onChange={(e) => setPhotolink(e.target.value)}
              />
              <button
                className='bg-gray-300 px-5 grow rounded-2xl'
                onClick={addPhotoByLink}
              >
                Add&nbsp;photo
              </button>
            </div>
            <div className='grid grid-cols-3  mt-2 lg:grid-cols-6 md:grid-cols-4'>
              {addedPhotos.length > 0 &&
                addedPhotos.map((item, idx) => (
                  <div className='h-32 flex mr-2 ' key={idx}>
                    <img
                      className='rounded-2xl w-full object-cover'
                      src={'http://localhost:4000/uploads/' + item}
                      alt=''
                    />
                  </div>
                ))}
              <label className='h-32 cursor-pointer bg-transparent border rounded-2xl p-8 flex items-center justify-center text-gray-600'>
                <input
                  multiple
                  onChange={uploadImage}
                  className='hidden'
                  type='file'
                  name=''
                  id=''
                />
                <div className='flex justify-center gap-1'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z'
                    />
                  </svg>
                  Upload
                </div>
              </label>
            </div>
            <h2 className='text-xl mt-4'>Description</h2>
            <textarea
              name=''
              id=''
              cols='30'
              rows='10'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Perk perks={Perk} setPerks={setPerks} />
            <h2 className='text-2xl mt-4'> Extra info</h2>
            <p className='text-gray-500 text-sm'>house rules etc</p>
            <textarea
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
            />
            <h2 className='text-2xl mt-4'>check in and out times, Max guest</h2>
            <p className='text-gray-500 text-sm'>
              add checkin and checkOut time
            </p>
            <div className='grid gap-2 sm:grid-cols-3'>
              <div>
                <h3 className='mt-2 -mb-1'>checkIn time</h3>
                <input
                  type='text'
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </div>
              <div>
                <h3 className='mt-2 -mb-1'>CheckOut time</h3>
                <input
                  type='text'
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </div>
              <div>
                <h3 className='mt-2 -mb-1'>Max guest</h3>
                <input
                  type='number'
                  value={maxGuests}
                  onChange={(e) => setMaxGuests(e.target.value)}
                />
              </div>
            </div>
            <div>
              <button className='primary my-4'> save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Accommodation;
