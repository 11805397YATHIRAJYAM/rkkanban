import Board from "./components/Board";
import TaskForm from "./components/TaskForm";

function App() {
  return (
    <>
      <div className="guvi-watermark">GUVI</div>

      <main className="app-shell min-h-screen px-4 py-6 md:px-8">
        <section className="mx-auto max-w-7xl">
          <div className="mb-8 overflow-hidden rounded-3xl border border-white/20 bg-white/90 p-6 shadow-2xl backdrop-blur">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-600">
              GUVI Project
            </p>
            <h1 className="mt-2 text-3xl font-black text-slate-900 md:text-5xl">
              Kanban Task Manager
            </h1>
            <p className="mt-3 max-w-2xl text-slate-600">
              Create, organize, edit, delete, and drag tasks between columns.
              Your tasks are saved automatically using localStorage.
            </p>
          </div>

          <TaskForm />
          <Board />
        </section>
      </main>
    </>
  );
}

export default App;
