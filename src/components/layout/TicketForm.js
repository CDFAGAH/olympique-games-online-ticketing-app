import { useEffect, useState } from "react";
import TicketProps from './Ticketprops';

export default function TicketForm({ onSubmit, menuItem }) {
  const [image, setImage] = useState(menuItem?.image || '');
  const [name, setName] = useState(menuItem?.name || '');
  const [description, setDescription] = useState(menuItem?.description || '');
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');
  const [numberOfPlaces, setNumberOfPlaces] = useState(menuItem?.numberOfPlaces || '');
  const [event, setEvent] = useState(menuItem?.event || '');
  const [type, setType] = useState(menuItem?.type || 'solo');
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [category, setCategory] = useState(menuItem?.category || '');
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);
  const [extraIngredientPrices, setExtraIngredientPrices] = useState(menuItem?.extraIngredientPrices || []);
  
  useEffect(() => {
    fetch('/api/categories').then(res => {
      res.json().then(categories => {
        setCategories(categories);
      });
    });

    fetch('/api/events').then(res => {
      res.json().then(events => {
        setEvents(events);
      });
    });
  }, []);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    
    if (!category || !event) {
      alert('Category and event fields cannot be empty');
      return;
    }

    console.log('Submitting form with:', {
      image,
      name,
      description,
      basePrice,
      numberOfPlaces,
      event,
      type,
      sizes,
      extraIngredientPrices,
      category,
    });

    onSubmit(ev, {
      image,
      name,
      description,
      basePrice,
      numberOfPlaces,
      event,
      type,
      sizes,
      extraIngredientPrices,
      category,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 max-w-2xl mx-auto">
      <div
        className="md:grid items-start gap-4"
        style={{ gridTemplateColumns: '.3fr .7fr' }}>
        <div>
          <label>Image Link</label>
          <input
            type="text"
            value={image}
            onChange={ev => setImage(ev.target.value)}
          />
          <img src={image} alt="Ticket Image" className="mt-4" />
        </div>
        <div className="grow">
          <label>Item name</label>
          <input
            type="text"
            value={name}
            onChange={ev => setName(ev.target.value)}
          />
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={ev => setDescription(ev.target.value)}
          />
          <label>Category</label>
          <select value={category} onChange={ev => setCategory(ev.target.value)}>
            <option value="">Select a category</option>
            {categories?.length > 0 && categories.map(c => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
          <label>Base price</label>
          <input
            type="text"
            value={basePrice}
            onChange={ev => setBasePrice(ev.target.value)}
          />
          <label>Number of Places</label>
          <input
            type="text"
            value={numberOfPlaces}
            onChange={ev => setNumberOfPlaces(ev.target.value)}
          />
          <label>Event</label>
          <select value={event} onChange={ev => setEvent(ev.target.value)}>
            <option value="">Select an event</option>
            {events?.length > 0 && events.map(e => (
              <option key={e._id} value={e._id}>{e.name}</option>
            ))}
          </select>
          <label>Type</label>
          <select value={type} onChange={ev => setType(ev.target.value)}>
            <option value="solo">Solo</option>
            <option value="family">Family</option>
            <option value="group">Group</option>
          </select>
          <TicketProps
            name={'Sizes'}
            addLabel={'Add item size'}
            props={sizes}
            setProps={setSizes}
          />
          <TicketProps
            name={'Extras'}
            addLabel={'Add ingredients prices'}
            props={extraIngredientPrices}
            setProps={setExtraIngredientPrices}
          />
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
}
