import React from 'react';

export default function page() {
  // TODO add action to form
  return (
    <div>
      <h2>Edition match</h2>
      <form>
        <label className="text-md" htmlFor="name">
          Nom de l&apos;évènement
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="text"
          id="name"
          name="name"
        />
        <label htmlFor="date" className="text-md">
          Date de l&apos;évènement
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="date"
          id="date"
          name="date"
        />
        <label htmlFor="location" className="text-md">
          Lieu de l&apos;évènement
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="text"
          id="location"
          name="location"
        />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}
