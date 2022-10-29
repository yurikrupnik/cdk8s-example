import { Construct } from 'constructs';
import { Chart, ChartProps } from 'cdk8s';
import { KubeDeployment, KubeService, IntOrString } from '../imports/k8s';
// import { Application } from './imports/argoproj.io';
// import { SecretStore, ExternalSecret } from './imports/external-secrets.io'

interface Props extends ChartProps {
    // shared
    labels?: {
        [key: string]: string
    };
    // deployment
    name?: string;
    image?: string;
    tag?: string;
    replicas?: number;
    // service
    type?: string;
    targetPort?: number
    // secrets
    secret?: string;
    // readonly version?: string;
}

// const defaultValues: Props = {
//   image: "nginx",
//   tag: "latest",
//   replicas: 1,
//   type: "ClusterIP",
//   targetPort: 80
// }

export class MyChart extends Chart {
    constructor(scope: Construct, id: string, props: Props = {}) {
        // props = defaultValues;
        super(scope, id, props);
        props.name = "nginx";
        props.tag = "latest";
        props.replicas = 1;
        props.image = "nginx";
        props.type = "ClusterIP";
        props.targetPort = 80;

        // new Helm(scope,"external-secrets", {
        //   chart: "external-secrets",
        //   releaseName: "external-secrets",
        //   values: {
        //   },
        //   helmFlags: [""],
        //   // helmExecutable: ""
        // })
        const {  type } = props;
        const label = { app: 'hello-k8s' };
        console.log(label)
        new KubeService(this, 'service', {
            spec: {
                type: type,
                ports: [ { name: "http", port: 8080, targetPort: IntOrString.fromNumber(80) } ],
                selector: label
            }
        });
        // console.log('image', props.image)
        // console.log('image', image)
        // console.log('tag', tag)
        // const img = IntOrString.fromString(props.image);
        new KubeDeployment(this, 'Deployment', {
            spec: {
                replicas: 1,
                selector: {
                    matchLabels: label
                },
                template: {
                    metadata: { labels: label },
                    // metadata: labels,
                    spec: {
                        containers: [
                            {
                                name: 'hello-kubernetes',
                                // image: `${props.image}:${props.tag}`,
                                image: props.image + ":" + props.tag,
                                // image: "nginx:latest",
                                ports: [ { containerPort: 80 } ]
                            }
                        ]
                    }
                }
            }
        });
        // define resources here
        // new Application(this, 'Application', {
        //   metadata: {
        //     name: "external-secrets",
        //     namespace: "argocd",
        //     annotations: {
        //       "argocd.argoproj.io/sync-wave": "1"
        //     },
        //     finalizers: [
        //       "resources-finalizer.argocd.argoproj.io"
        //     ]
        //   },
        //   spec: {
        //     project: "default",
        //     source: {
        //       repoUrl: "https://charts.external-secrets.io",
        //       targetRevision: "v0.6.0",
        //       chart: "external-secrets",
        //       helm: {
        //         parameters: [
        //           {
        //             name: "installCRDs",
        //             value: "true"
        //           }
        //         ]
        //       },
        //     },
        //     destination: {
        //       server: "https://kubernetes.default.svc",
        //       namespace: "external-secrets"
        //     },
        //     syncPolicy: {
        //       automated: {
        //         prune: true,
        //         selfHeal: true
        //       },
        //       syncOptions: ["CreateNamespace=true"]
        //     }
        //     // sync
        //   }
        // });

        // const secret = new SecretStore(this, "SecretStore", {
        //   metadata: {
        //     name: "example"
        //   },
        //   spec: {
        //     provider: {
        //       gcpsm: {
        //         auth: {
        //           secretRef: {
        //             secretAccessKeySecretRef: {
        //               name: "dasd",
        //               key: "asdasd"
        //             }
        //           }
        //         },
        //         projectId: "das"
        //       }
        //     }
        //   },
        // });
        // const externalSecret = new ExternalSecret(this, "ExternalSecret", {
        //   metadata: {
        //     name: "example"
        //   },
        //   spec: {
        //     refreshInterval: "1h",
        //     secretStoreRef: {
        //       kind: "SecretStore",
        //       name: "example"
        //     },
        //     target: {
        //       name: "secret-to-be-created",
        //       creationPolicy: "Owner"
        //     },
        //     data: [
        //       {
        //         secretKey: "dev-secret-test",
        //         remoteRef: {
        //           key: "dev-secret-test"
        //         }
        //       }
        //     ]
        //   }
        // })
    }
}