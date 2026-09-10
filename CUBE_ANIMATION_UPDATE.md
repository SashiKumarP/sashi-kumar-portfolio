3D Cube animation update

Changed only: src/App.tsx

Added EngineeringCube to the existing Intelligence Systems, Scalable Systems, and Strategic Innovation visual panels.
- Real 6-face CSS 3D cube using preserve-3d + perspective.
- Slow continuous Y rotation and subtle X/Z motion.
- Scroll-linked X/Y tilt and vertical lift using useScroll/useTransform/useSpring.
- Section-specific colors and icon/label faces.
- Existing section layout, copy, chips, navigation, and other portfolio features were left unchanged.

Validation: App.tsx TypeScript/JSX transpilation reported 0 diagnostics.
