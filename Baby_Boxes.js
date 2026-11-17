var canvas = document.getElementById("renderCanvas");

var startRenderLoop = function (engine, canvas) {
    engine.runRenderLoop(function () {
        if (sceneToRender && sceneToRender.activeCamera) {
            sceneToRender.render();
        }
    });
}

var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };
        
var camera;

var createScene = async function () {
   /* ———————————————————
      1.  BASIC SCENE SETUP
   ———————————————————— */
   const scene = new BABYLON.Scene(engine);

   // Even, realistic PBR lighting for any GLB (⚠️ NEW)
   scene.createDefaultEnvironment({
        createGround: false,     // we already make our own ground
        createSkybox: false,
        environmentIntensity: 1.0
   });

   // Lights (keep if you like—you now have the HDRI + these)
   const light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 100, 100), scene);

   // Camera
   camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 50, BABYLON.Vector3.Zero(), scene);
   camera.attachControl(canvas, true);

   // Ground
   //const ground = BABYLON.Mesh.CreateGround("ground", 500, 500, 10, scene);
   //ground.position.y = -10;

   var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 1000, height: 1000 }, scene);
   ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.8, restitution: 0.5, disableBidirectionalTransformation: true }, scene);
   ground.checkCollisions = true;
   ground.material = new BABYLON.GridMaterial("mat", scene);

   /* ———————————————————
   2.  DEMO BOXES (unchanged)
   ———————————————————— */
   const box  = BABYLON.Mesh.CreateBox("box", 4.0, scene);
   box.position.set(20, 22, 60);
   box.isPickable = true;
   const matBox = new BABYLON.StandardMaterial("matBox", scene);
   matBox.diffuseColor = new BABYLON.Color3(1, 0.1, 0.1);
   box.material = matBox;

   const box2 = BABYLON.Mesh.CreateBox("box2", 8.0, scene);
   box2.position.set(20, 16, 60);
   const matBox2 = new BABYLON.StandardMaterial("matBox2", scene);
   matBox2.diffuseColor = new BABYLON.Color3(0.1, 0.1, 1);
   box2.material = matBox2;

   /* ———————————————————
   3.  IMPORT HEART MODEL
   ———————————————————— */
   BABYLON.SceneLoader.ImportMesh("", "./", "HeartFinalized.glb", scene,
   function (meshes) {
        const heart = meshes[0];

        // Position & scale
        heart.position.set(30, 45, -180);
        heart.scaling.setAll(5);        // make it bigger
        heart.isPickable = true;        // allow grabbing

        /* DEBUG COLOR (uncomment if model still shows black)
        const mat = new BABYLON.StandardMaterial("heartMat", scene);
        mat.diffuseColor = new BABYLON.Color3(0.8, 0.1, 0.1);
        heart.material = mat;
         */

        console.log("Heart loaded!");
    }
   );

   BABYLON.SceneLoader.ImportMesh("", "./", "monitor001.glb", scene,
   function (meshes) {
        const monitor = meshes[0];

        // Position & scale
        monitor.position.set(-40, 16, 70);
        monitor.scaling.setAll(5);        // make it bigger
        monitor.isPickable = true;        // allow grabbing

        /* DEBUG COLOR (uncomment if model still shows black)
        const mat = new BABYLON.StandardMaterial("monitorMat", scene);
        mat.diffuseColor = new BABYLON.Color3(0.8, 0.1, 0.1);
        monitor.material = mat;
         */

        console.log("Monitor loaded!");
    }
   );

   BABYLON.SceneLoader.ImportMesh("", "./", "SLOT Machine.glb", scene,
   function (meshes) {
        const slotMachine = meshes[0];

        // Position & scale
        slotMachine.position.set(-30, 40, 150);
        slotMachine.rotation.y = Math.PI;
        slotMachine.scaling.setAll(50);        // make it bigger
        slotMachine.isPickable = true;        // allow grabbing

        /* DEBUG COLOR (uncomment if model still shows black)
        const mat = new BABYLON.StandardMaterial("slotMachineMat", scene);
        mat.diffuseColor = new BABYLON.Color3(0.8, 0.1, 0.1);
        slotMachine.material = mat;
         */

        console.log("Slot Machine loaded!");
    }
   );

   BABYLON.SceneLoader.ImportMesh("", "./", "HORNET.glb", scene,
   function (meshes) {
        const hornet = meshes[0];

        // Position & scale
        hornet.position.set(-120, 20, 50);
        hornet.scaling.setAll(40);        // make it bigger
        hornet.isPickable = true;        // allow grabbing

        /* DEBUG COLOR (uncomment if model still shows black)
        const mat = new BABYLON.StandardMaterial("hornetMat", scene);
        mat.diffuseColor = new BABYLON.Color3(0.8, 0.1, 0.1);
        hornet.material = mat;
         */

        console.log("Hornet loaded!");
    }
   );

   BABYLON.SceneLoader.ImportMesh("", "./", "pool0835_wm.glb", scene,
   function (meshes) {
        const pool0835 = meshes[0];

        // Position & scale
        pool0835.position.set(50, 25, 140);
        pool0835.scaling.setAll(15);        // make it bigger
        pool0835.isPickable = true;        // allow grabbing

        /* DEBUG COLOR (uncomment if model still shows black)
        const mat = new BABYLON.StandardMaterial("pool0835Mat", scene);
        mat.diffuseColor = new BABYLON.Color3(0.8, 0.1, 0.1);
        pool0835.material = mat;
         */

        console.log("Pool0835 loaded!");
    }
   );

   BABYLON.SceneLoader.ImportMesh("", "./", "BeigeMeetingRoom_2.glb", scene,
   function (meshes) {
        const meetingRoom = meshes[0];

        // Position & scale
        meetingRoom.position.set(50, 0.5, 50);
        meetingRoom.scaling.setAll(50);        // make it bigger
        //meetingRoom.isPickable = true;        // allow grabbing

        /* DEBUG COLOR (uncomment if model still shows black)
        const mat = new BABYLON.StandardMaterial("meetingRoomMat", scene);
        mat.diffuseColor = new BABYLON.Color3(0.8, 0.1, 0.1);
        meetingRoom.material = mat;
         */

        console.log("Meeting Room loaded!");
    }
   );

   BABYLON.SceneLoader.ImportMesh("", "./", "OJO GLB.glb", scene,
   function (meshes) {
        const ojo = meshes[0];

        // Position & scale
        ojo.position.set(90, 15, -20);
        ojo.scaling.setAll(20);        // make it bigger
        ojo.isPickable = true;        // allow grabbing

        scene.onBeforeRenderObservable.add(() => {
            ojo.rotation.y += (Math.PI / 2) * engine.getDeltaTime() / 1000;
        });

        /* DEBUG COLOR (uncomment if model still shows black)
        const mat = new BABYLON.StandardMaterial("ojoMat", scene);
        mat.diffuseColor = new BABYLON.Color3(0.8, 0.1, 0.1);
        ojo.material = mat;
         */

        console.log("Ojo loaded!");
    }
   );

   BABYLON.SceneLoader.ImportMesh("", "./", "camel.glb", scene,
   function (meshes) {
        const camel = meshes[0];

        // Position & scale
        camel.position.set(0, 0, -50);
        camel.scaling.setAll(5);        // make it bigger
        camel.isPickable = true;        // allow grabbing

        /* DEBUG COLOR (uncomment if model still shows black)
        const mat = new BABYLON.StandardMaterial("camelMat", scene);
        mat.diffuseColor = new BABYLON.Color3(0.8, 0.1, 0.1);
        camel.material = mat;
         */

        console.log("Camel loaded!");
    }
   );

   /* ———————————————————
   4.  WEB‑XR SETUP (unchanged)
    ———————————————————— */
    
    const xrHelper = await scene.createDefaultXRExperienceAsync({
       floorMeshes: [ground]
    });

    let grabbedMesh = null;
    xrHelper.input.onControllerAddedObservable.add((controller) => {
    controller.onMotionControllerInitObservable.add((mc) => {
    if (mc.handness === "left") {
        const trigger = mc.getComponent(mc.getComponentIds()[0]); // xr-standard-trigger
        trigger.onButtonStateChangedObservable.add(() => {
        if (trigger.changes.pressed) {
            if (trigger.pressed) {
              grabbedMesh = xrHelper.pointerSelection.getMeshUnderPointer(controller.uniqueId);
              if (grabbedMesh && grabbedMesh !== ground) {
                grabbedMesh.setParent(mc.rootMesh); // grab
              }
              } else {
                 grabbedMesh && grabbedMesh.setParent(null); // release
              }
        }
        });
                                }
    });
    });

    return scene;
    };


    window.initFunction = async function() {
                                
    var asyncEngineCreation = async function() {
        try {
            return createDefaultEngine();
        } catch(e) {
            console.log("the available createEngine function failed. Creating the default engine instead");
            return createDefaultEngine();
                        }
        }

        window.engine = await asyncEngineCreation();
                    
        const engineOptions = window.engine.getCreationOptions?.();
        if (!engineOptions || engineOptions.audioEngine !== false) {
                        
        }
        if (!engine) throw 'engine should not be null.';
        startRenderLoop(engine, canvas);
        window.scene = createScene();};
        initFunction().then(() => {scene.then(returnedScene => { sceneToRender = returnedScene; });
        
        });

        // Resize
        window.addEventListener("resize", function () {
           engine.resize();
        });
  