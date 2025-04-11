export default function About() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-3/5 space-y-6">
        <div className="space-y-3">
          <h1 className="text-xl font-medium">About</h1>
          <div className="text-sm text-neutral-400">4th Year Computer Science from the University of Waterloo.</div>
          <div className="text-sm text-neutral-400">Checkout my profiles</div>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-medium mb-2">Education</h2>
            <ul className="space-y-1.5 text-sm text-neutral-400">
              <li className="flex items-center">
                <span className="w-1 h-1 bg-neutral-600 rounded-full mr-2"></span>
                University of Waterloo
              </li>
              <li className="flex items-center">
                <span className="w-1 h-1 bg-neutral-600 rounded-full mr-2"></span>
                Chalmers Institute of Technology
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-medium mb-2">Relevant Coursework</h2>
            <ul className="space-y-1.5 text-sm text-neutral-400">
              <li className="flex items-center">
                <span className="w-1 h-1 bg-neutral-600 rounded-full mr-2"></span>
                Applied Machine Learning
              </li>
              <li className="flex items-center">
                <span className="w-1 h-1 bg-neutral-600 rounded-full mr-2"></span>
                Game Engine Architecture
              </li>
              <li className="flex items-center">
                <span className="w-1 h-1 bg-neutral-600 rounded-full mr-2"></span>
                Introduction to Artifical Intelligence
              </li>
              <li className="flex items-center">
                <span className="w-1 h-1 bg-neutral-600 rounded-full mr-2"></span>
                Computer Networks
              </li>
              <li className="flex items-center">
                <span className="w-1 h-1 bg-neutral-600 rounded-full mr-2"></span>
                Application Development
              </li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium mb-2">Experience</h2>
          <ul className="space-y-1.5 text-sm text-neutral-400">
            <li className="flex items-center">
              <span className="w-1 h-1 bg-neutral-600 rounded-full mr-2"></span>
              experience 1
            </li>
            <li className="flex items-center">
              <span className="w-1 h-1 bg-neutral-600 rounded-full mr-2"></span>
              experience 2
            </li>
            <li className="flex items-center">
              <span className="w-1 h-1 bg-neutral-600 rounded-full mr-2"></span>
              experience 3
            </li>
            <li className="flex items-center">
              <span className="w-1 h-1 bg-neutral-600 rounded-full mr-2"></span>
              experience 4
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
