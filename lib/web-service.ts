
import { Construct } from 'constructs';
import { Names } from 'cdk8s';
import { KubeDeployment, KubeService, IntOrString } from '../imports/k8s';

export interface WebServiceProps {
    /**
     * The Docker image to use for this service.
     * @default nginx
     */
    readonly image: string;

    /**
     * Number of replicas.
     *
     * @default 1
     */
    readonly replicas?: number;

    /**
     * External port.
     *
     * @default 80
     */
    readonly port?: number;

    /**
     * Internal port.
     *
     * @default 8080
     */
    readonly containerPort?: number;

    /**
     * Internal namespace.
     *
     * @default default
     */
    readonly namespace?: string;
}

export class WebService extends Construct {
    constructor(scope: Construct, id: string, props: WebServiceProps) {
        super(scope, id);

        const port = props.port || 80;
        const namespace = props.namespace || "default";
        const containerPort = props.containerPort || 8080;
        const label = { app: Names.toDnsLabel(this) };
        const replicas = props.replicas ?? 1;

        new KubeService(this, 'service', {
            metadata: {
              namespace,
            },
            spec: {
                type: 'ClusterIP',
                ports: [ { port, targetPort: IntOrString.fromNumber(containerPort) } ],
                selector: label
            }
        });

        new KubeDeployment(this, 'deployment', {
            metadata: {
              namespace
            },
            spec: {
                replicas,
                selector: {
                    matchLabels: label
                },
                template: {
                    metadata: { labels: label },
                    spec: {
                        containers: [
                            {
                                name: 'app',
                                // image: props.image,
                                image: 'nginx:latest',
                                // image: "mongo",
                                ports: [ { containerPort } ]
                            }
                        ]
                    }
                }
            }
        });
    }
}
