
setup-kind:
    -ctlptl create cluster kind --registry=ctlptl-registry

up: setup-kind
    tilt up
down:
    tilt down
    kind delete cluster