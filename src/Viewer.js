import React, { useEffect, useState } from 'react'
import Unity, { UnityContent } from "react-unity-webgl";
import { makeStyles } from '@material-ui/core/styles';

const unityContent = new UnityContent(
    "Build/Build.json",
    "Build/UnityLoader.js",
    {
        adjustOnWindowResize: true
    }
);

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        height: "100%"
    },
    unityContent: {
        background: "white",
        width: "100%",
        height: "100%",
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));



export default function Viewer(props) {
    const classes = useStyles();
    const [ready, setReady] = useState(false);
    const [fileName, setFileName] = useState(null);

    unityContent.on("Ready", () => {
        setReady(true)
        loadFile();

      if(typeof props.onReady == "function")  props.onReady();
    }
    );

    unityContent.on("OnLoaded", () => {
        if(typeof props.onLoaded == "function")  props.onLoaded();    
    }
    );

    unityContent.on("OnError", () => {
        if(typeof props.onError == "function")  props.onError();    
    }
    );

    useEffect(() => {
        if (ready) loadFile()
    }, [props.file]);

    const loadFile = () => {
        if (props.file &&  typeof props.file == "object") {
            var reader = new FileReader();
            reader.onload = (function (file) {
                return function (e) {
                    (window.filedata = window.filedata ? window.filedata : {})[file.name] = e.target.result;
                    unityContent.send("root", "FileUpload", file.name)
                    setFileName(file.name);
        }
            })(props.file);
            reader.readAsArrayBuffer(props.file);
        }
        else if (typeof props.file == "string") {
            unityContent.send("root", "Load", JSON.stringify({ file: props.file }))
            setFileName(props.file);
        }
        else{
            unityContent.send("root", "Clear");
            setFileName("");
        }

    }

    return (
        <div className={classes.root} >
             <Unity unityContent={unityContent} height="100%" width="100%" className={classes.unityContent} />
        </div>
    )
}
