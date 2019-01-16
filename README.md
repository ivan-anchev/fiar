# Four-in-a-row

Four-in-a-row game impemenation built with [Angular](https://angular.io)

## Getting started

To get the game up and running, checkout this repo and run the following commands from the root directory
1. ```npm install``` to install all dependencies
2. ```npm run ws_api``` to start the WebSocket server
3. ```npm start``` to start the development server at `http://localhost:4200/`
4. **TODO** ```npm test``` to start the test runner
5. ```npm build``` for JIT build or ```npm run build-aot``` for [AOT](https://angular.io/guide/aot-compiler)

## Structure

```
  ├── api                   # Webscocket API
  ├── dist                  # Build output directory
  ├── lib                   # Libraries (ex. websocket-connection).
  └── src                   # Source files (alternatively `lib` or `app`)
       └── app              
            └── views       
                  ├── root  # Root module [Lazy] (wraps the application)
                  └── game  # Game module [Lazy] (holds the logic of the game itself)
            ├── core        # Core services module 
            ├── store       # Contains store actions, reducers and effects
            ├── shared      # Shared module for commonly used components
            ├── models      # Models
            └── guards      # Guards 
 ```
## State

State is management via [NgRx](https://ngrx.io)

### TODOS
1. Tests
2. Disconnect/Reconnect
3. PWA
