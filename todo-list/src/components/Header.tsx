import React from "react";
import { motion } from "framer-motion";

const icon = {
  hidden: {
    opacity: 0,
    pathLength: 0,
    fill: "rgba(255, 255, 255, 0)",
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    fill: "rgba(255, 255, 255, 1)",
  }
}

export const Header: React.FC = () => {
  return (
    <header className="p-4 bg-gradient-to-r from-sky-500 to-indigo-500">
      <h1 className="text-2xl flex justify-center">
        <motion.svg
          width="406"
          height="74.001"
          viewBox="0 0 406 74.001"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M 361.9 23 L 361.9 30.6 L 360.3 31.6 A 23.662 23.662 0 0 0 354.549 28.936 A 26.554 26.554 0 0 0 354.1 28.8 A 23.655 23.655 0 0 0 350.328 28.035 Q 348.491 27.807 346.433 27.8 A 38.507 38.507 0 0 0 346.3 27.8 Q 343.3 27.8 340.85 28.35 A 10.452 10.452 0 0 0 339.028 28.927 Q 337.983 29.374 337.2 30.03 A 6.277 6.277 0 0 0 336.95 30.25 A 4.43 4.43 0 0 0 335.629 32.659 A 6.589 6.589 0 0 0 335.5 34 A 6.44 6.44 0 0 0 335.843 36.149 A 5.432 5.432 0 0 0 337.6 38.6 A 14.846 14.846 0 0 0 339.802 40.061 Q 341.244 40.853 343.05 41.5 Q 346.4 42.7 350.1 43.9 Q 353.8 45.1 357.15 46.9 Q 360.5 48.7 362.6 51.7 Q 364.7 54.7 364.7 59.5 A 17.766 17.766 0 0 1 364.382 62.966 Q 363.966 65.059 363.003 66.68 A 9.635 9.635 0 0 1 361.75 68.35 Q 358.8 71.5 354 72.75 A 39.358 39.358 0 0 1 345.804 73.956 A 45.25 45.25 0 0 1 343.8 74 Q 338.88 74 335 73.28 A 33.324 33.324 0 0 1 334.1 73.1 A 90.487 90.487 0 0 1 331.119 72.411 Q 329.654 72.045 328.372 71.663 A 47.572 47.572 0 0 1 326.9 71.2 L 326.9 63.8 L 328.5 62.8 Q 331.7 64.7 335.4 65.75 Q 339.1 66.8 344.5 66.8 A 34.128 34.128 0 0 0 348.219 66.605 A 28.471 28.471 0 0 0 350.3 66.3 A 10.952 10.952 0 0 0 352.552 65.642 A 8.27 8.27 0 0 0 354.75 64.3 A 4.82 4.82 0 0 0 356.293 61.728 Q 356.487 60.949 356.499 60.024 A 9.465 9.465 0 0 0 356.5 59.9 Q 356.5 56.6 354.4 54.7 Q 352.3 52.8 348.95 51.6 Q 345.6 50.4 341.85 49.3 Q 338.1 48.2 334.75 46.55 Q 331.4 44.9 329.3 42 A 10.449 10.449 0 0 1 327.669 38.441 Q 327.295 36.991 327.219 35.286 A 19.914 19.914 0 0 1 327.2 34.4 A 17.34 17.34 0 0 1 327.426 31.516 Q 327.829 29.13 328.95 27.4 Q 330.7 24.7 333.65 23.2 Q 336.6 21.7 340.15 21.15 Q 343.7 20.6 347.3 20.6 A 51.967 51.967 0 0 1 351.763 20.783 A 40.161 40.161 0 0 1 355.35 21.25 A 41.495 41.495 0 0 1 359.016 22.068 A 31.721 31.721 0 0 1 361.9 23 Z M 281.9 72.8 L 239.9 72.8 L 240.9 64.8 L 240.9 10.8 L 239.9 2.8 L 250.4 2.8 L 249.4 10.8 L 249.4 65 L 275.9 65 L 281.9 64 L 281.9 72.8 Z M 150.1 22.3 L 159.9 29 L 159.9 35 Q 158.1 32.9 155.75 31.3 Q 153.4 29.7 150.4 28.75 A 19.352 19.352 0 0 0 147.205 28.045 Q 145.431 27.8 143.4 27.8 A 24.426 24.426 0 0 0 139.646 28.071 Q 137.658 28.381 136.023 29.044 A 12.418 12.418 0 0 0 134.3 29.9 A 11.673 11.673 0 0 0 130.025 34.435 A 15.434 15.434 0 0 0 129.15 36.35 A 22.749 22.749 0 0 0 128.082 40.256 Q 127.718 42.209 127.582 44.472 A 47.066 47.066 0 0 0 127.5 47.3 Q 127.5 57 131.25 61.9 Q 135 66.8 143.6 66.8 Q 146.687 66.8 148.98 66.233 A 13.224 13.224 0 0 0 150.4 65.8 Q 153.1 64.8 154.85 63.25 Q 156.6 61.7 157.6 59.9 L 158.4 65.9 L 149.8 72.8 Q 147.9 73.3 145.8 73.65 A 26.16 26.16 0 0 1 142.255 73.988 A 29.505 29.505 0 0 1 141.4 74 A 22.653 22.653 0 0 1 133.734 72.728 A 20.85 20.85 0 0 1 129.9 70.9 A 20.457 20.457 0 0 1 123.244 64.286 A 25.788 25.788 0 0 1 121.85 61.8 A 27.41 27.41 0 0 1 119.592 54.948 Q 118.987 51.859 118.911 48.32 A 47.695 47.695 0 0 1 118.9 47.3 A 43.238 43.238 0 0 1 119.336 40.979 Q 119.835 37.603 120.907 34.791 A 23.012 23.012 0 0 1 122 32.35 A 24.095 24.095 0 0 1 125.398 27.372 A 19.189 19.189 0 0 1 130.15 23.5 Q 135.2 20.6 141 20.6 A 26.24 26.24 0 0 1 143.709 20.733 A 19.283 19.283 0 0 1 146.2 21.15 A 44.91 44.91 0 0 1 147.827 21.57 Q 149.1 21.925 150.1 22.3 Z M 381.3 58.5 L 381.3 14.6 L 380.8 7.6 L 390.2 7.6 L 389.7 14.6 L 389.7 58.3 Q 389.7 63.1 391.85 64.95 Q 394 66.8 398.2 66.8 A 16.874 16.874 0 0 0 399.734 66.734 Q 400.509 66.663 401.179 66.516 A 9.098 9.098 0 0 0 401.65 66.4 Q 403.1 66 404.4 65.3 L 406 66.3 L 406 72.5 Q 403.8 73.3 401.55 73.65 A 29.006 29.006 0 0 1 398.059 73.986 A 25.765 25.765 0 0 1 397.2 74 Q 393.2 74 389.55 72.65 Q 385.9 71.3 383.6 67.95 A 11.57 11.57 0 0 1 382.09 64.704 Q 381.3 62.074 381.3 58.5 Z M 165.7 72.8 L 157.8 72.8 L 156.3 67.6 L 156.3 8 L 155.3 0 L 165.7 0 L 164.7 8 L 164.7 64.8 L 165.7 72.8 Z M 84.2 74 Q 90.3 74 95.75 71.4 A 18.959 18.959 0 0 0 100.839 67.841 A 23.15 23.15 0 0 0 104.65 62.9 A 21.202 21.202 0 0 0 106.27 59.413 Q 107.236 56.747 107.692 53.52 A 44.541 44.541 0 0 0 108.1 47.3 A 50.855 50.855 0 0 0 108.05 45.016 Q 107.922 42.171 107.467 39.703 A 26.632 26.632 0 0 0 106.1 34.8 A 26.198 26.198 0 0 0 104.403 31.249 A 19.968 19.968 0 0 0 100.7 26.55 Q 97.3 23.4 93 22 Q 88.7 20.6 84.2 20.6 Q 79.7 20.6 75.4 22 Q 71.1 23.4 67.7 26.55 A 19.508 19.508 0 0 0 64.566 30.317 A 25.302 25.302 0 0 0 62.3 34.8 A 23.974 23.974 0 0 0 61.611 36.826 Q 60.3 41.309 60.3 47.3 A 48.169 48.169 0 0 0 60.454 51.223 Q 60.709 54.351 61.392 57.01 A 22.867 22.867 0 0 0 63.75 62.9 A 25.101 25.101 0 0 0 65.297 65.242 A 19.646 19.646 0 0 0 72.7 71.4 Q 78.2 74 84.2 74 Z M 84.2 66.8 A 18.455 18.455 0 0 0 89.01 66.207 A 13.262 13.262 0 0 0 95.4 62.4 A 12.323 12.323 0 0 0 97.776 58.503 Q 99.227 54.854 99.457 49.268 A 52.823 52.823 0 0 0 99.5 47.1 A 46.982 46.982 0 0 0 99.319 42.84 Q 99.127 40.732 98.729 38.967 A 18.382 18.382 0 0 0 97.65 35.6 A 14.536 14.536 0 0 0 95.891 32.584 A 10.686 10.686 0 0 0 92.4 29.6 A 14.914 14.914 0 0 0 88.263 28.17 Q 86.493 27.823 84.471 27.801 A 25.287 25.287 0 0 0 84.2 27.8 A 21.41 21.41 0 0 0 80.399 28.12 Q 78.127 28.53 76.263 29.464 A 13.26 13.26 0 0 0 76 29.6 A 10.854 10.854 0 0 0 72.131 33.102 A 15.05 15.05 0 0 0 70.75 35.6 Q 68.9 39.8 68.9 47.1 A 46.081 46.081 0 0 0 69.156 52.144 Q 69.925 59.1 73 62.4 Q 77.1 66.8 84.2 66.8 Z M 201.6 74 Q 207.7 74 213.15 71.4 A 18.959 18.959 0 0 0 218.239 67.841 A 23.15 23.15 0 0 0 222.05 62.9 A 21.202 21.202 0 0 0 223.67 59.413 Q 224.636 56.747 225.092 53.52 A 44.541 44.541 0 0 0 225.5 47.3 A 50.855 50.855 0 0 0 225.45 45.016 Q 225.322 42.171 224.867 39.703 A 26.632 26.632 0 0 0 223.5 34.8 A 26.198 26.198 0 0 0 221.803 31.249 A 19.968 19.968 0 0 0 218.1 26.55 Q 214.7 23.4 210.4 22 Q 206.1 20.6 201.6 20.6 Q 197.1 20.6 192.8 22 Q 188.5 23.4 185.1 26.55 A 19.508 19.508 0 0 0 181.966 30.317 A 25.302 25.302 0 0 0 179.7 34.8 A 23.974 23.974 0 0 0 179.011 36.826 Q 177.7 41.309 177.7 47.3 A 48.169 48.169 0 0 0 177.854 51.223 Q 178.109 54.351 178.792 57.01 A 22.867 22.867 0 0 0 181.15 62.9 A 25.101 25.101 0 0 0 182.697 65.242 A 19.646 19.646 0 0 0 190.1 71.4 Q 195.6 74 201.6 74 Z M 201.6 66.8 A 18.455 18.455 0 0 0 206.41 66.207 A 13.262 13.262 0 0 0 212.8 62.4 A 12.323 12.323 0 0 0 215.176 58.503 Q 216.627 54.854 216.857 49.268 A 52.823 52.823 0 0 0 216.9 47.1 A 46.982 46.982 0 0 0 216.719 42.84 Q 216.527 40.732 216.129 38.967 A 18.382 18.382 0 0 0 215.05 35.6 A 14.536 14.536 0 0 0 213.291 32.584 A 10.686 10.686 0 0 0 209.8 29.6 A 14.914 14.914 0 0 0 205.663 28.17 Q 203.893 27.823 201.871 27.801 A 25.287 25.287 0 0 0 201.6 27.8 A 21.41 21.41 0 0 0 197.799 28.12 Q 195.527 28.53 193.663 29.464 A 13.26 13.26 0 0 0 193.4 29.6 A 10.854 10.854 0 0 0 189.531 33.102 A 15.05 15.05 0 0 0 188.15 35.6 Q 186.3 39.8 186.3 47.1 A 46.081 46.081 0 0 0 186.556 52.144 Q 187.325 59.1 190.4 62.4 Q 194.5 66.8 201.6 66.8 Z M 31.3 72.8 L 20.8 72.8 L 21.8 64.8 L 21.8 6.4 L 30.3 6.4 L 30.3 64.8 L 31.3 72.8 Z M 312.7 72.8 L 302.3 72.8 L 303.3 64.8 L 303.3 28.6 L 292.9 28.6 L 292.9 21.8 L 312.7 21.8 L 311.7 29.8 L 311.7 64.8 L 312.7 72.8 Z M 6 10.6 L 0 11.6 L 0 2.8 L 52.1 2.8 L 52.1 11.6 L 46.1 10.6 L 6 10.6 Z M 377.7 28.8 L 372.7 29.3 L 372.7 21.8 L 379.1 21.8 L 385.5 24.8 L 391.9 21.8 L 405 21.8 L 405 29.3 L 400 28.8 L 377.7 28.8 Z M 305.9 13.4 Q 308.3 13.4 310 11.85 A 4.994 4.994 0 0 0 311.471 9.428 A 6.9 6.9 0 0 0 311.7 7.6 A 7.397 7.397 0 0 0 311.6 6.36 A 5.102 5.102 0 0 0 310 3.35 Q 308.3 1.8 305.9 1.8 Q 303.5 1.8 301.8 3.35 A 4.994 4.994 0 0 0 300.329 5.772 A 6.9 6.9 0 0 0 300.1 7.6 A 7.397 7.397 0 0 0 300.2 8.84 A 5.102 5.102 0 0 0 301.8 11.85 Q 303.5 13.4 305.9 13.4 Z"
            variants={icon}
            initial="hidden"
            className="stroke-black stroke-2"
            animate="visible"
            transition={{
              default: { duration: 2, ease: "easeInOut" },
              fill: { duration: 2, ease: [1, 0, 0.8, 1] },
            }}
          />
        </motion.svg>
      </h1>
    </header>
  )
}