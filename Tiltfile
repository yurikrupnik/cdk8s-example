local_resource('bun', cmd='bun install', deps=['package.json'], labels=['bun'])

# local_resource(
#   'test-cdk8s',
#   dir=".",
#   cmd='bun run test',
#   deps=['./main.ts'],
#   resource_deps=["bun"],
# )

local_resource(
  "Import CRD's",
  cmd="bun run import",
  trigger_mode=TRIGGER_MODE_AUTO,
  deps=["./cdk8s.yaml"],
)

local_resource(
  'build-docs',
  dir=".",
  cmd='bun run typedoc',
  deps=['./lib/'],
  resource_deps=["bun", "build-cdk8s"],
  ignore=["dist/", "./lib/**.d.ts"]
)

local_resource(
  'build-cdk8s',
  dir=".",
  cmd='bun run compile',
  deps=['./main.ts', './lib'],
  resource_deps=['bun'],
  ignore=['dist/']
)

local_resource(
  'build-synth',
  dir=".",
  cmd='bun run synth',
  deps=['./main.ts', './lib'],
  # ignore=["./imports/", "./node_modules/"],
  resource_deps=["bun", "build-cdk8s"],
)

# Does not delete changed values in cluster - example namespace
# local_resource(
#   'kubectl deploy',
#   dir=".",
#   cmd='kubectl apply -f dist/*.yaml',
#   deps=['./dist/'],
#   resource_deps=["build-synth"],
# )




# templated_yaml = local('./template_yaml.sh')

k8s_yaml(['dist/cdk8s-example.k8s.yaml'])