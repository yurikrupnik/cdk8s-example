
import { Construct } from 'constructs';
import { Helm} from 'cdk8s';
// import { KubeDeployment, KubeService, IntOrString } from '../imports/k8s';

// export interface WebServiceProps {
//     /**
//      * The Docker image to use for this service.
//      * @default nginx
//      */
//     readonly image: string;
//
//     /**
//      * Number of replicas.
//      *
//      * @default 1
//      */
//     readonly replicas?: number;
//
//     /**
//      * External port.
//      *
//      * @default 80
//      */
//     readonly port?: number;
//
//     /**
//      * Internal port.
//      *
//      * @default 8080
//      */
//     readonly containerPort?: number;
// }

export class Argocd extends Construct {
    constructor(scope: Construct, id: string) {
        super(scope, id);
        // props.values = {}
        const helm = new Helm(this, "argocd", {
            helmFlags: [
                "installCRDs=true"
            ],
            // helmExecutable: "",
            values: {},
            // chart: "argo/argo-cd",
            chart: "https://argoproj.github.io/argo-helm",
            releaseName: "argocd"
        });
        console.log('helm', helm.releaseName);
        // helm.apiObjects
        // const port = props.port || 80;
        // const containerPort = props.containerPort || 8080;
        // const label = { app: Names.toDnsLabel(this) };
        // const replicas = props.replicas ?? 1;


    }
}
