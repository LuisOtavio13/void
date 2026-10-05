import { EventMap } from "./types/event-types";

class EventBus {
    private listernes = new Map<keyof EventMap, Set<(data: any) => void>>();

    on<K extends keyof EventMap>(event: K, callback: (data: EventMap[K]) => void) {
       let listerners = this.listernes.get(event);
       if(!listerners) {
        listerners = new Set();
        this.listernes.set(event, listerners);
       }
       listerners.add(callback);
       return () =>{
        listerners?.delete(callback);
       }
    }

    emit<K extends keyof EventMap>(event: K, data: EventMap[K]) {
        
        this.listernes.get(event)?.forEach((callback) => callback(data));
    }
    
}
const eventBus = new EventBus();
export { eventBus };