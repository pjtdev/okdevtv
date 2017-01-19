# TensorFlow
* ML Library
* https://www.tensorflow.org/

## install
* mac
  * virtualenv 사용
```
sudo pip install --upgrade virtualenv
virtualenv --system-site-packages ~/tensorflow
source ~/tensorflow/bin/activate
TF_BINARY_URL=https://storage.googleapis.com/tensorflow/mac/cpu/tensorflow-0.12.0-py2-none-any.whl
pip install --upgrade $TF_BINARY_URL
deactivate
```

* win
  * install pip-Win https://sites.google.com/site/pydatalog/python/pip-for-windows
```
pip install --upgrade virtualenv
virtualenv --system-site-packages tensorflow
tensorflow\Scripts\activate
pip install --upgrade https://storage.googleapis.com/tensorflow/mac/cpu/tensorflow-0.12.0-py2-none-any.whl
deactivate
```

## first example
```
import tensorflow as tf
import numpy as np

# Create 100 phony x, y data points in NumPy, y = x * 0.1 + 0.3
x_data = np.random.rand(100).astype(np.float32)
y_data = x_data * 0.1 + 0.3

# Try to find values for W and b that compute y_data = W * x_data + b
# (We know that W should be 0.1 and b 0.3, but TensorFlow will
# figure that out for us.)
W = tf.Variable(tf.random_uniform([1], -1.0, 1.0))
b = tf.Variable(tf.zeros([1]))
y = W * x_data + b

# Minimize the mean squared errors.
loss = tf.reduce_mean(tf.square(y - y_data))
optimizer = tf.train.GradientDescentOptimizer(0.5)
train = optimizer.minimize(loss)

# Before starting, initialize the variables.  We will 'run' this first.
init = tf.global_variables_initializer()

# Launch the graph.
sess = tf.Session()
sess.run(init)

# Fit the line.
for step in range(201):
    sess.run(train)
    if step % 20 == 0:
        print(step, sess.run(W), sess.run(b))

# Learns best fit is W: [0.1], b: [0.3]
```
* code from : https://www.tensorflow.org/get_started/

## ref
* 모두를 위한 머신러닝/딥러닝 강의
  * http://hunkim.github.io/ml/
* TensorFlow Tutorials
  * https://github.com/golbin/TensorFlow-Tutorials