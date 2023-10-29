import Card from "@/components/Card";
import Messages from "./messages";

export default function page() {
  return (
      <Card>
          <h2 className="font-anime-ace mb-4">Ajout d'un évènement</h2>
          <form 
              className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground" 
              action="/event/routes/create"
              method="post"
          >
              <label className="text-md" htmlFor="name">Nom de l'évènement</label>
              <input className="rounded-md px-4 py-2 bg-inherit border mb-6" type="text" id="name" name="name" />
              <label htmlFor="date" className="text-md" >Date de l'évènement</label>
              <input className="rounded-md px-4 py-2 bg-inherit border mb-6" type="date" id="date" name="date" />
              <label htmlFor="location" className="text-md" >Lieu de l'évènement</label>
              <input className="rounded-md px-4 py-2 bg-inherit border mb-6" type="text" id="location" name="location" />
              <button type="submit">Ajouter</button>
          </form>
        <Messages />
      </Card>
  )
}
