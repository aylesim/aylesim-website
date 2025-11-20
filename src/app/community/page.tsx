export default function Community() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-6">Community & Networking</h1>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          A hub for connecting with other creative technologists, sharing resources, and showcasing user contributions.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-zinc-900/50 p-8 rounded-lg border border-zinc-800">
          <h2 className="text-2xl font-bold mb-4">For Artists</h2>
          <p className="text-zinc-400 mb-6">
            Share your work made with Aylesim tools. Get featured in our showcase and join our monthly creative challenges.
          </p>
          <button className="w-full py-3 border border-zinc-700 rounded hover:bg-zinc-800 transition-colors">Join Discord</button>
        </div>
        <div className="bg-zinc-900/50 p-8 rounded-lg border border-zinc-800">
          <h2 className="text-2xl font-bold mb-4">For Developers</h2>
          <p className="text-zinc-400 mb-6">
            Contribute to open-source tools, access developer documentation, and collaborate on experimental projects.
          </p>
          <button className="w-full py-3 border border-zinc-700 rounded hover:bg-zinc-800 transition-colors">View Documentation</button>
        </div>
      </div>
      
      <div className="border-t border-zinc-800 pt-12">
         <h2 className="text-xl font-bold mb-6 text-center">Latest from the Community</h2>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 opacity-50">
            {[1,2,3,4].map(i => (
               <div key={i} className="aspect-square bg-zinc-900 rounded flex items-center justify-center">
                  <span className="text-xs text-zinc-600">User Content</span>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
}


