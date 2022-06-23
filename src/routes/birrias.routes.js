import {Router} from "express"
import {methods as birriasController} from "../controllers/birrias.controller"


 const router = Router()
 
 router.get("/", birriasController.getBirrias)
 router.get("/:id", birriasController.getBirria)
 router.delete("/:id", birriasController.deleteBirria)
 router.post("/", birriasController.addBirrias)
 router.put("/:id", birriasController.updateBirria)
 router.put("/addplayer/:id", birriasController.addPlayer)

 export default router