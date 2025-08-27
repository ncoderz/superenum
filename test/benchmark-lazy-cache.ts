import { Enum } from '../src';

// Create a large enum for testing
const createLargeEnum = (size: number) => {
  const obj: Record<string, string> = {};
  for (let i = 0; i < size; i++) {
    obj[`key_${i}`] = `value_${i}`;
  }
  return obj;
};

// Benchmark memory usage for simple operations
const benchmarkSimpleOperations = () => {
  console.log('🚀 Lazy Cache Performance Benchmark\n');
  console.log('Testing memory efficiency with simple operations...\n');
  
  const sizes = [10, 100, 1000, 10000];
  
  for (const size of sizes) {
    const enum1 = createLargeEnum(size);
    
    // Measure initial memory after creating Enum wrapper (minimal operations)
    const memBefore = process.memoryUsage().heapUsed / 1024 / 1024;
    
    const wrapped = Enum(enum1);
    
    // Only use basic operations that shouldn't trigger cache creation
    wrapped.hasValue('value_0');
    wrapped.hasValue('value_1');
    
    const memAfterBasic = process.memoryUsage().heapUsed / 1024 / 1024;
    
    // Now trigger cache creation with operations that need it
    wrapped.keys(); // Should not create extra cache (uses _keys directly)
    wrapped.values(); // Creates _values cache
    wrapped.entries(); // Creates _entries cache
    wrapped.fromKey('key_5', { ignoreCase: true }); // Creates lowercase maps
    
    const memAfterFull = process.memoryUsage().heapUsed / 1024 / 1024;
    
    console.log(`Enum size: ${size} items`);
    console.log(`  Memory before: ${memBefore.toFixed(2)} MB`);
    console.log(`  Memory after basic ops: ${memAfterBasic.toFixed(2)} MB (diff: ${(memAfterBasic - memBefore).toFixed(2)} MB)`);
    console.log(`  Memory after cache ops: ${memAfterFull.toFixed(2)} MB (diff: ${(memAfterFull - memAfterBasic).toFixed(2)} MB)`);
    console.log('');
  }
};

// Benchmark initialization speed
const benchmarkInitSpeed = () => {
  console.log('Testing initialization speed...\n');
  
  const sizes = [100, 1000, 5000];
  
  for (const size of sizes) {
    const enum1 = createLargeEnum(size);
    
    // Benchmark simple initialization (no cache operations)
    const startSimple = performance.now();
    for (let i = 0; i < 1000; i++) {
      const wrapped = Enum(enum1);
      wrapped.hasValue(`value_${i % size}`);
    }
    const endSimple = performance.now();
    
    // Benchmark with cache operations
    const startWithCache = performance.now();
    for (let i = 0; i < 1000; i++) {
      const wrapped = Enum(enum1);
      wrapped.values();
      wrapped.entries();
    }
    const endWithCache = performance.now();
    
    console.log(`Enum size: ${size} items`);
    console.log(`  1000 iterations with basic ops: ${(endSimple - startSimple).toFixed(2)} ms`);
    console.log(`  1000 iterations with cache ops: ${(endWithCache - startWithCache).toFixed(2)} ms`);
    console.log('');
  }
};

// Run benchmarks
benchmarkSimpleOperations();
benchmarkInitSpeed();

console.log('✅ Benchmark complete!');
console.log('\nKey improvements with lazy cache initialization:');
console.log('- Memory only allocated when features are actually used');
console.log('- Basic operations (hasValue) don\'t trigger unnecessary cache creation');
console.log('- Faster initialization for simple use cases');