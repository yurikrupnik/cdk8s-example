import { App, Chart, ChartProps } from 'cdk8s';
import { ConfigMap, Namespace } from 'cdk8s-plus-24'
// import {MyChart}  from './src/deployment';
import { Construct } from 'constructs';
import { WebService } from './lib/web-service';
// import {Argocd} from "./lib/argocd";

export class MyChart extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = { }) {
    super(scope, id, props);
    // TODO resolve - ref https://cdk8s.io/docs/latest/basics/helm/
    // new Helm(this, 'redis', {
    //   chart: 'bitnami/redis',
    //   values: {
    //     // sentinel: {
    //     //   enabled: true
    //     // }
    //   }
    // });
    // const dashboard = new Include(this, 'dashboard', {
    //   // url: 'https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml',
    //   url: `${__dirname}/lib/argocd.yaml`,
    // });
    // const deploymentApiObject = dashboard.apiObjects.find(c => c.kind === 'Deployment');
    // if (deploymentApiObject) {
    //   console.log('deploymentApiObject.name', deploymentApiObject.name);
    // }
    const namespace = new Namespace(this, 'namespace', {
      metadata: {
        name: "users",
        namespace: 'users',
        annotations: {},
        labels: {},
        finalizers: [],
        // ownerReferences: ''
      }
    });
    new ConfigMap(this, "config", {
      metadata: {
        finalizers: [],
        labels: {
          // label1: "label value1",
          // label2: "label value2"
        },
        name: "nginx-config",
        annotations: {
          annotation1: "annotation1",
          annotation2: "annotation2",
        },
        namespace: namespace.name,
      },
      data: {
        // stam: "my data here",
        // "more-data": "more of my data here"
      }
    });
    // new WebService(this, 'api', { image: 'nginx', replicas: 1, namespace: namespace.name });
    new WebService(this, 'web', { image: 'nginx', containerPort: 80, namespace: namespace.name });
  }
}

const app = new App();
new MyChart(app, 'cdk8s-example', {
  // replicas: 1
  // image: "shit",
  // tag: "latest",
});

// new MyChart(app, 'second-example', {
//   // replicas: 4
//   // image: "shit",
//   // tag: "latest",
// });
app.synth();
