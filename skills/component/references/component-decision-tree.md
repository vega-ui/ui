# Component Decision Tree

1. Can an existing VegaUI component solve this with props only?
2. If not, can a thin wrapper solve it?
3. If not, can composition of existing VegaUI parts solve it?
4. Only then add custom behavior.

If the answer is "props only", do not create a new component.
If the answer is "wrapper only", keep API narrow.
If the answer is "composition", protect complex wiring behind a product-facing surface.
